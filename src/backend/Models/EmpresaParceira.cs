using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    [Table("EmpresaParceira")]
    public class EmpresaParceira
    {
        [Key]
        public int IdEmpresaParceira { get; set; }

        [Required, MaxLength(100)]
        public string Email { get; set; } = string.Empty;

        [Required, MaxLength(50)]
        public string Senha { get; set; } = string.Empty;

        [Required, MaxLength(100)]
        public string Nome { get; set; } = string.Empty;

        [Required, MaxLength(20)]
        public string Cnpj { get; set; } = string.Empty;

        [Required, MaxLength(255)]
        public string Endereco { get; set; } = string.Empty;
    }
}