namespace api.Models
{
    public class Review
    {
        public Guid Id { get; set; } 
        public Guid ProductId { get; set; }
        public string Info { get; set; }
        public string Name { get; set; }   

    }
}
