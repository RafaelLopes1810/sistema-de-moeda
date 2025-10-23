namespace backend.DTOs
{
    public class AlunoDTO
    {
        public int IdAluno { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Senha { get; set; } = string.Empty;
        public string Nome { get; set; } = string.Empty;
        public string Cpf { get; set; } = string.Empty;
        public string Rg { get; set; } = string.Empty;
        public string Endereco { get; set; } = string.Empty;
        public string Curco { get; set; } = string.Empty;
        public double SaldoMoedas { get; set; }
    }
}
