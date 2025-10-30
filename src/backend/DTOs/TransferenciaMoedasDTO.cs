namespace backend.DTOs
{
    public class TransferenciaMoedasDTO
    {
        public int IdRemetente { get; set; }
        public int IdDestinatario { get; set; }
        public double Quantidade { get; set; }
    }
}
