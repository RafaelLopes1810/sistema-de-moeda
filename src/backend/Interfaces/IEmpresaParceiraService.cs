using backend.DTOs;

namespace backend.Interfaces
{
    public interface IEmpresaParceiraService
    {
        Task<IEnumerable<EmpresaParceiraDTO>> GetAllAsync();
        Task<EmpresaParceiraDTO?> GetByIdAsync(int id);
        Task<EmpresaParceiraDTO> AddAsync(EmpresaParceiraDTO dto);
        Task<EmpresaParceiraDTO?> UpdateAsync(int id, EmpresaParceiraDTO dto);
        Task<bool> DeleteAsync(int id);
    }
}
