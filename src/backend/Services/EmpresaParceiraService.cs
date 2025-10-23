using AutoMapper;
using backend.DTOs;
using backend.Interfaces;
using backend.Models;

namespace backend.Services
{
    public class EmpresaParceiraService : IEmpresaParceiraService
    {
        private readonly IEmpresaParceiraRepository _repository;
        private readonly IMapper _mapper;

        public EmpresaParceiraService(IEmpresaParceiraRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<EmpresaParceiraDTO>> GetAllAsync()
        {
            var empresas = await _repository.GetAllAsync();
            return _mapper.Map<IEnumerable<EmpresaParceiraDTO>>(empresas);
        }

        public async Task<EmpresaParceiraDTO?> GetByIdAsync(int id)
        {
            var empresa = await _repository.GetByIdAsync(id);
            return empresa == null ? null : _mapper.Map<EmpresaParceiraDTO>(empresa);
        }

        public async Task<EmpresaParceiraDTO> AddAsync(EmpresaParceiraDTO dto)
        {
            var empresa = _mapper.Map<EmpresaParceira>(dto);
            var added = await _repository.AddAsync(empresa);
            return _mapper.Map<EmpresaParceiraDTO>(added);
        }

        public async Task<EmpresaParceiraDTO?> UpdateAsync(int id, EmpresaParceiraDTO dto)
        {
            var empresa = _mapper.Map<EmpresaParceira>(dto);
            empresa.IdEmpresaParceira = id;
            var updated = await _repository.UpdateAsync(empresa);
            return updated == null ? null : _mapper.Map<EmpresaParceiraDTO>(updated);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            return await _repository.DeleteAsync(id);
        }
    }
}
