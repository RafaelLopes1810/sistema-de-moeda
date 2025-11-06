namespace backend.DTOs
{
    public class VantagemDTO
    {
        public string Nome { get; set; } = null!;
        public string Descricao { get; set; } = null!;
        public int CustoMoedas { get; set; }
        public string FotoUrl { get; set; } = null!;
    }
}