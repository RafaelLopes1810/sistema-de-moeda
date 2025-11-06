using backend.DTOs;
using backend.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VantagemController : ControllerBase
    {
        private readonly VantagemService _vantagemService;

        public VantagemController(VantagemService vantagemService)
        {
            _vantagemService = vantagemService;
        }

        /// <summary>
        /// Cadastra uma nova vantagem vinculada a uma empresa parceira.
        /// </summary>
        /// <param name="empresaId">ID da empresa parceira</param>
        /// <param name="dto">Dados da vantagem</param>
        [HttpPost("empresa/{empresaId}")]
        public async Task<IActionResult> CadastrarVantagem(int empresaId, [FromBody] VantagemDTO dto)
        {
            try
            {
                if (dto == null)
                    return BadRequest(new { erro = "Os dados da vantagem são obrigatórios." });

                var vantagem = await _vantagemService.CadastrarVantagemAsync(empresaId, dto);
                return Ok(new
                {
                    mensagem = "Vantagem cadastrada com sucesso!",
                    vantagem
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { erro = ex.Message });
            }
        }

        /// <summary>
        /// Lista todas as vantagens disponíveis no sistema (visão do aluno).
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> ListarVantagens()
        {
            try
            {
                var vantagens = await _vantagemService.ListarVantagensAsync();

                if (vantagens == null || !vantagens.Any())
                    return NotFound(new { mensagem = "Nenhuma vantagem encontrada." });

                return Ok(vantagens);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { erro = "Erro ao listar vantagens.", detalhe = ex.Message });
            }
        }
    }
}