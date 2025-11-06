using backend.Data;
using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class VantagemRepository
    {
        private readonly AppDbContext _context;

        public VantagemRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Vantagem> AdicionarAsync(Vantagem vantagem)
        {
            _context.Vantagens.Add(vantagem);
            await _context.SaveChangesAsync();
            return vantagem;
        }

        public async Task<List<Vantagem>> ListarTodasAsync()
        {
            return await _context.Vantagens
                .Include(v => v.EmpresaParceira) // inclui dados da empresa
                .ToListAsync();
        }
    }
}