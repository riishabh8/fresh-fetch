namespace api.Models
{
    public class User
    {
        public Guid Id { get; set; }

        public string FullName { get; set; }
        public string Email { get; set; }
        public Int64 PhoneNumber { get; set; }

        public string Password { get; set; }

        public bool isAdmin { get; set; }
    }
}
