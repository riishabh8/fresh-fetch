namespace api.Models
{
    public class AddUserRequest
    {
        public string FullName { get; set; }
        public String Email { get; set; }
        public Int64 PhoneNumber { get; set; }

        public String Password { get; set; }

        public String? Key { get; set; }    
    }
}
