using Backend.DAO;
using Backend.DTOs;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AlunosController : ControllerBase
    {
        private readonly IAlunoDao _alunoDao;
        private readonly ILogger<AlunosController> _logger;

        public AlunosController(IAlunoDao alunoDao, ILogger<AlunosController> logger)
        {
            _alunoDao = alunoDao;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var alunos = await _alunoDao.GetAllAsync();
            return Ok(alunos);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> Get(int id)
        {
            var aluno = await _alunoDao.GetByIdAsync(id);
            if (aluno == null) return NotFound();
            return Ok(aluno);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AlunoCreateDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Nome) || string.IsNullOrWhiteSpace(dto.Email) || string.IsNullOrWhiteSpace(dto.Senha))
                return BadRequest("Nome, Email e Senha são obrigatórios.");

            // Em produção: hash da senha (ex: BCrypt)
            var aluno = new Aluno
            {
                Nome = dto.Nome,
                Email = dto.Email,
                Cpf = dto.Cpf,
                Rg = dto.Rg,
                Endereco = dto.Endereco,
                Curso = dto.Curso,
                Senha = dto.Senha,
                SaldoMoedas = dto.SaldoMoedas
            };

            var newId = await _alunoDao.CreateAsync(aluno);
            aluno.IdAluno = newId;
            return CreatedAtAction(nameof(Get), new { id = newId }, aluno);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] AlunoUpdateDto dto)
        {
            var existing = await _alunoDao.GetByIdAsync(id);
            if (existing == null) return NotFound();

            // atualiza somente campos enviados (simples)
            existing.Nome = dto.Nome ?? existing.Nome;
            existing.Email = dto.Email ?? existing.Email;
            existing.Cpf = dto.Cpf ?? existing.Cpf;
            existing.Rg = dto.Rg ?? existing.Rg;
            existing.Endereco = dto.Endereco ?? existing.Endereco;
            existing.Curso = dto.Curso ?? existing.Curso;
            if (dto.Senha != null) existing.Senha = dto.Senha; // em produção: hash
            if (dto.SaldoMoedas.HasValue) existing.SaldoMoedas = dto.SaldoMoedas.Value;

            var ok = await _alunoDao.UpdateAsync(id, existing);
            if (!ok) return StatusCode(500, "Erro ao atualizar.");
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var ok = await _alunoDao.DeleteAsync(id);
            if (!ok) return NotFound();
            return NoContent();
        }
    }
}
