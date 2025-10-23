using backend.Models;

namespace backend.Interfaces
{
    public interface IEmpresaParceiraRepository
    {
        Task<IEnumerable<EmpresaParceira>> GetAllAsync();
        Task<EmpresaParceira?> GetByIdAsync(int id);
        Task<EmpresaParceira> AddAsync(EmpresaParceira empresa);
        Task<EmpresaParceira?> UpdateAsync(EmpresaParceira empresa);
        Task<bool> DeleteAsync(int id);
    }
}
