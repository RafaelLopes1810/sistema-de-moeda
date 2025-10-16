using Backend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Backend.DAO
{
    public interface IAlunoDao
    {
        Task<IEnumerable<Aluno>> GetAllAsync();
        Task<Aluno?> GetByIdAsync(int id);
        Task<int> CreateAsync(Aluno aluno); // retorna id inserido
        Task<bool> UpdateAsync(int id, Aluno aluno);
        Task<bool> DeleteAsync(int id);
    }
}
