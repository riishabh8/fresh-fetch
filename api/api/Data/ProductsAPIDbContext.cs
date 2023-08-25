using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class ProductsAPIDbContext : DbContext
    {
        public ProductsAPIDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Product> Products {  get; set; }    
        public DbSet<User> Users {  get; set; }

        public DbSet<Review> Reviews { get; set; }
     
        public DbSet<Order> Orders { get; set; }
    }
}
