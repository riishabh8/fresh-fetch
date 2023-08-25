namespace api.Models
{
    public class AddProductRequest
    {
        public string ProductName { get; set; }
        public String Description { get; set; }
        public String Category { get; set; }

        public Int32 Quantity { get; set; }

        public IFormFile? ImageFile { get; set; }


        public Double Price { get; set; }
        public Double? Discount { get; set; }

        public String? Specification { get; set; }

    }
}
