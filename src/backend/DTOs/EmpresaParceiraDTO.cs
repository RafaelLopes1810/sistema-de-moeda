namespace backend.DTOs
{
    public class EmpresaParceiraDTO
    {
        public int IdEmpresaParceira { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Senha { get; set; } = string.Empty;
        public string Nome { get; set; } = string.Empty;
        public string Cnpj { get; set; } = string.Empty;
        public string Endereco { get; set; } = string.Empty;
    }
}
