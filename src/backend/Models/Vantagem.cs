using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Vantagem
    {
        public int Id { get; set; }
        public string Nome { get; set; } = null!;
        public string Descricao { get; set; } = null!;
        public int CustoMoedas { get; set; }
        public string FotoUrl { get; set; } = null!;
        
        // Relação com empresa
        public int EmpresaParceiraId { get; set; }
        public EmpresaParceira EmpresaParceira { get; set; } = null!;
    }
}