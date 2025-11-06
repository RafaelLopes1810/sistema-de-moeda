using AutoMapper;
using backend.DTOs;
using backend.Interfaces;
using backend.Models;

namespace backend.Services
{
    public class VantagemService
    {
        private readonly EmpresaParceiraRepository _empresaRepository;
        private readonly VantagemRepository _vantagemRepository;

        public VantagemService(EmpresaParceiraRepository empresaRepository, VantagemRepository vantagemRepository)
        {
            _empresaRepository = empresaRepository;
            _vantagemRepository = vantagemRepository;
        }

        public async Task<Vantagem> CadastrarVantagemAsync(int empresaId, VantagemDTO dto)
        {
            var empresa = await _empresaRepository.BuscarPorIdAsync(empresaId);

            if (empresa == null)
                throw new Exception("Empresa não encontrada.");

            var vantagem = new Vantagem
            {
                Nome = dto.Nome,
                Descricao = dto.Descricao,
                CustoMoedas = dto.CustoMoedas,
                FotoUrl = dto.FotoUrl,
                EmpresaParceiraId = empresa.Id
            };

            return await _vantagemRepository.AdicionarAsync(vantagem);
        }

        public async Task<List<VantagemResponseDTO>> ListarVantagensAsync()
        {
            var vantagens = await _vantagemRepository.ListarTodasAsync();

            return vantagens.Select(v => new VantagemResponseDTO
            {
                Id = v.Id,
                Nome = v.Nome,
                Descricao = v.Descricao,
                CustoMoedas = v.CustoMoedas,
                FotoUrl = v.FotoUrl,
                EmpresaParceiraNome = v.EmpresaParceira.Nome
            }).ToList();
        }
    }
}