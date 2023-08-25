using api.Data;
using Microsoft.AspNetCore.Mvc;
using api.Models;

namespace api.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class ReveiwController: ControllerBase
    {
        private readonly ProductsAPIDbContext dbContext;
        public ReveiwController(ProductsAPIDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        [HttpGet]
        [Route("{id:guid}")]
        public async Task<IActionResult> GetReviews([FromRoute] Guid id)  {
            try
            {
                var reviews = dbContext.Reviews.Where(o => o.ProductId == id).ToList();


                return await Task.FromResult<IActionResult>(Ok(reviews));

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);

            }
        }
        [HttpPost]
        public async Task<IActionResult> PostReviews(PostReviewBody body)
        {
            try
            {
                var newReview = new Review
                {
                    Id = new Guid(),
                    ProductId = body.ProductId,
                    Info = body.Info,
                    Name = body.Name,

                };
                await dbContext.Reviews.AddAsync(newReview);
                await dbContext.SaveChangesAsync();
                return Ok(newReview);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);

            }
        }
    }
}
