namespace Backend.Models
{
    public class Aluno
    {
        public int IdAluno { get; set; }
        public string Nome { get; set; } = "";
        public string Email { get; set; } = "";
        public string? Cpf { get; set; }
        public string? Rg { get; set; }
        public string? Endereco { get; set; }
        public string? Curso { get; set; }
        public string Senha { get; set; } = ""; // armazenar hashed em produção
        public double SaldoMoedas { get; set; }
        public DateTime? CriadoEm { get; set; }
    }
}
