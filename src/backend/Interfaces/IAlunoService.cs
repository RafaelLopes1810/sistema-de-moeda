using backend.DTOs;

namespace backend.Interfaces
{
    public interface IAlunoService
    {
        Task<IEnumerable<AlunoDTO>> GetAllAsync();
        Task<AlunoDTO?> GetByIdAsync(int id);
        Task<AlunoDTO> CreateAsync(AlunoDTO alunoDto);
        Task<AlunoDTO?> UpdateAsync(int id, AlunoDTO alunoDto);
        Task<bool> TransferirMoedasAsync(TransferenciaMoedasDTO dto);
        Task<bool> DeleteAsync(int id);
    }
}
