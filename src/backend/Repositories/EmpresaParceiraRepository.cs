using backend.Data;
using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class EmpresaParceiraRepository : IEmpresaParceiraRepository
    {
        private readonly AppDbContext _context;

        public EmpresaParceiraRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<EmpresaParceira>> GetAllAsync()
        {
            return await _context.EmpresasParceira.ToListAsync();
        }

        public async Task<EmpresaParceira?> GetByIdAsync(int id)
        {
            return await _context.EmpresasParceira.FindAsync(id);
        }

        public async Task<EmpresaParceira> AddAsync(EmpresaParceira empresa)
        {
            _context.EmpresasParceira.Add(empresa);
            await _context.SaveChangesAsync();
            return empresa;
        }

        public async Task<EmpresaParceira?> UpdateAsync(EmpresaParceira empresa)
        {
            var existing = await _context.EmpresasParceira.FindAsync(empresa.IdEmpresaParceira);
            if (existing == null) return null;

            _context.Entry(existing).CurrentValues.SetValues(empresa);
            await _context.SaveChangesAsync();
            return existing;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var empresa = await _context.EmpresasParceira.FindAsync(id);
            if (empresa == null) return false;

            _context.EmpresasParceira.Remove(empresa);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
