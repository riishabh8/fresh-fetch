using api.Data;
using api.Models;

public class DatabaseSeeder
{
    private readonly ProductsAPIDbContext dbContext;
    public DatabaseSeeder (ProductsAPIDbContext dbContext)
    {
        this.dbContext = dbContext;
    }
    public void SeedAdminUser()
    {
        if (dbContext.Users.Any())
        {
            return;
        }
        var adminUser = new User
        {
            Id = new Guid(),
            FullName = "Admin",
            PhoneNumber = 1234,
            Password = "Master@admin123",
            Email = "adminUser@email.com",
            isAdmin = true
        
        };
        dbContext.Users.Add(adminUser);
        dbContext.SaveChanges();

    }
}
