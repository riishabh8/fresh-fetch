namespace api.Helpers
{
    public class JwtSettings
    {
        public string Secret { get; set; }
        public int ExpirationDays { get; set; }
    }

}
