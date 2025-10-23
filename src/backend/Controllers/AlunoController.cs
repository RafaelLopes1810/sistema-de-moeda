using backend.DTOs;
using backend.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AlunoController : ControllerBase
    {
        private readonly IAlunoService _alunoService;

        public AlunoController(IAlunoService alunoService)
        {
            _alunoService = alunoService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var alunos = await _alunoService.GetAllAsync();
            return Ok(alunos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var aluno = await _alunoService.GetByIdAsync(id);
            if (aluno == null) return NotFound("Aluno não encontrado.");
            return Ok(aluno);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AlunoDTO alunoDto)
        {
            var created = await _alunoService.CreateAsync(alunoDto);
            return CreatedAtAction(nameof(GetById), new { id = created.IdAluno }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] AlunoDTO alunoDto)
        {
            var updated = await _alunoService.UpdateAsync(id, alunoDto);
            if (updated == null) return NotFound("Aluno não encontrado.");
            return Ok(updated);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _alunoService.DeleteAsync(id);
            if (!deleted) return NotFound("Aluno não encontrado.");
            return NoContent();
        }
    }
}
