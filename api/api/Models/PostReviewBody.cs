namespace api.Models
{
    public class PostReviewBody
    {
        public Guid ProductId { get; set; }
        public string Info { get; set; }
        public string Name { get; set; }
    }
}
