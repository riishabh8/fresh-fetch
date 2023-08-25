using api.Data;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using api.Migrations;

namespace api.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class OrderController : Controller
    {
        private readonly ProductsAPIDbContext dbContext;
        public OrderController(ProductsAPIDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost]
        public async Task<IActionResult> AddOrder()
        {
           // Console.Write(Request.Form["userId"]);
            try
            {
                Guid userId = Guid.Parse(Request.Form["userId"].ToString());
                Guid orderId = Guid.NewGuid();
                OrderTemp[] orders = JsonSerializer.Deserialize<OrderTemp[]>(Request.Form["orders"]);
                foreach (OrderTemp order in orders)
                {
                    var productId = Guid.Parse(order.id);
                    var product = await dbContext.Products.FindAsync(productId);
                    if (product.Quantity - order.quantity >= 0)
                    {
                        var newOrder = new Order
                        {
                            Id = new Guid(),
                            OrderId = orderId,
                            ProductId = productId,
                            Price = order.price,
                            Quantity = order.quantity,
                            UserId = userId,
                            Date = DateTime.Now.ToString("dd/MM/yyyy")
                        };
                        dbContext.Orders.Add(newOrder);
                        product.Quantity -= order.quantity;
                        await dbContext.SaveChangesAsync();

                    }
                    else
                    {
                        return BadRequest("Out of Stock");
                    }

                }
                return Ok(new { message = "Order Placed Successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest("Order Not Placed");
            }
        }
        [HttpGet]
        [Route("{id:guid}")]
        public async Task<IActionResult> GetOrder([FromRoute] Guid id)
        {
            try
            {
                var userId = id;    
                var orders =  dbContext.Orders.Where(o => o.UserId == userId).ToList();
                var orderDetails = orders.Select(order => new
                {
                    order.Id,
                    order.OrderId,
                    order.ProductId,
                    order.UserId,
                    order.Price,
                    order.Quantity,
                    order.Date,
                    Product = dbContext.Products.FirstOrDefault(p => p.Id == order.ProductId)
                });
            return Ok(orderDetails);

            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

    }
}
