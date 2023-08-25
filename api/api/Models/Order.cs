namespace api.Models
{
    public class Order
    {
        public Guid Id { get; set; }
        public Guid OrderId { get; set; }    
        public Guid ProductId { get; set; }    
        public Guid UserId { get; set; }
        public int Price { get; set; }    
        public int Quantity { get; set; }    

        public string Date { get; set; }

    }
}
