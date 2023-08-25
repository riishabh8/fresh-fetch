using api.Data;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;


namespace api.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]

   
    public class ProductsController : Controller
    {
        private readonly ProductsAPIDbContext dbContext;
        public ProductsController(ProductsAPIDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            return Ok(await dbContext.Products.ToListAsync());

        }
        [HttpGet]
        [Route("{id:guid}")]
        public async Task<IActionResult> GetProduct([FromRoute] Guid id)
        {
            var product = await dbContext.Products.FindAsync(id);
            if(product == null)
            {
                return NotFound();
            }
            return Ok(product);

        }
     

        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> AddProduct()
        {
            try
            {
                var file = Request.Form.Files[0];


                var productName = Request.Form["ProductName"].ToString();
                var description = Request.Form["Description"].ToString();
                var category = Request.Form["Category"].ToString();
                var quantity = Request.Form["Quantity"].ToString();
                var price = Request.Form["Price"].ToString();
                var discount = Request.Form["Discount"].ToString();
                var specification = Request.Form["Specification"].ToString();

                // Generate a unique filename to avoid conflicts
                var uniqueFileName = Guid.NewGuid().ToString() + "_" + file.FileName;
                var imagePath = Path.Combine("wwwroot", "uploads", uniqueFileName); // Save the image in the "uploads" folder within the "wwwroot" directory

                using (var stream = new FileStream(imagePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }


                var imagePathFinal = Path.Combine("wwwroot", "uploads", uniqueFileName);

                var imageBytes = System.IO.File.ReadAllBytes(imagePathFinal);
                var base64Image = Convert.ToBase64String(imageBytes);
                var imageUrl = $"data:image/jpeg;base64,{base64Image}";

                // Save the image information in the database
                var newProduct = new Product
                {
                    ProductName = productName,
                    Description = description,    
                       Category = category,
                       Quantity = Int32.Parse(quantity),
                       Price=Int32.Parse(price),
                       Discount=Int32.Parse(discount),
                       Specification=specification,
                       ImageFile = imageUrl,
                };

                dbContext.Products.Add(newProduct);
                await dbContext.SaveChangesAsync();

                return Ok(new { message = "Image uploaded successfully" });



            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }


        }

        [HttpPut]
        [Route("{id:guid}")]
        public async Task<IActionResult> UpdateProduct([FromRoute] Guid id,UpdateProductRequest updateProductRequest)
        {
            var product = await dbContext.Products.FindAsync(id);
            if (product != null)
            {
                product.ProductName = updateProductRequest.ProductName;
                product.Description = updateProductRequest.Description; 
                product.Category = updateProductRequest.Category;   
                product.Quantity = updateProductRequest.Quantity;   
                    product.Price = updateProductRequest.Price;
                    product.Discount = updateProductRequest.Discount;
                product.Specification = updateProductRequest.Specification;
                await dbContext.SaveChangesAsync();

                return Ok(product);
            }
            return NotFound();
        }

        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> DeleteProduct([FromRoute] Guid id)
        {
            var product = await dbContext.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            dbContext.Remove(product);
            await dbContext.SaveChangesAsync();
            return Ok(product);

        }
    }
}
