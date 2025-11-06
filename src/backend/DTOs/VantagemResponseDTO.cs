namespace backend.DTOs
{
    public class VantagemResponseDTO
    {
        public int Id { get; set; }
        public string Nome { get; set; } = null!;
        public string Descricao { get; set; } = null!;
        public int CustoMoedas { get; set; }
        public string FotoUrl { get; set; } = null!;
        public string EmpresaParceiraNome { get; set; } = null!;
    }
}