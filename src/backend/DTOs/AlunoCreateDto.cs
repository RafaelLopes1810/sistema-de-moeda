namespace Backend.DTOs
{
    public class AlunoCreateDto
    {
        public string Nome { get; set; } = "";
        public string Email { get; set; } = "";
        public string? Cpf { get; set; }
        public string? Rg { get; set; }
        public string? Endereco { get; set; }
        public string? Curso { get; set; }
        public string Senha { get; set; } = "";
        public double SaldoMoedas { get; set; } = 0;
    }
}
