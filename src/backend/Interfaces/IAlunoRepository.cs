using backend.Models;

namespace backend.Interfaces
{
    public interface IAlunoRepository
    {
        Task<IEnumerable<Aluno>> GetAllAsync();
        Task<Aluno?> GetByIdAsync(int id);
        Task<Aluno> CreateAsync(Aluno aluno);
        Task<Aluno?> UpdateAsync(Aluno aluno);
        Task<bool> DeleteAsync(int id);
    }
}
