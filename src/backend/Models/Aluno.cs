using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    [Table("Aluno")]
    public class Aluno
    {
        [Key]
        public int IdAluno { get; set; }

        [Required, MaxLength(100)]
        public string Email { get; set; } = string.Empty;

        [Required, MaxLength(50)]
        public string Senha { get; set; } = string.Empty;

        [Required, MaxLength(100)]
        public string Nome { get; set; } = string.Empty;

        [Required, MaxLength(20)]
        public string Cpf { get; set; } = string.Empty;

        [Required, MaxLength(20)]
        public string Rg { get; set; } = string.Empty;

        [Required, MaxLength(255)]
        public string Endereco { get; set; } = string.Empty;

        [Required, MaxLength(50)]
        public string Curco { get; set; } = string.Empty;

        [Required]
        public double SaldoMoedas { get; set; }
    }
}