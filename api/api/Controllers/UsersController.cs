using api.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using api.Models;
using api.Helpers;
using api.Services;

namespace api.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class UsersController :Controller
    {
        private readonly ProductsAPIDbContext dbContext;
        private readonly JwtService jwtService;
        private readonly JwtSettings jwtSettings;
        public UsersController(ProductsAPIDbContext dbContext, JwtService jwtService, JwtSettings jwtSettings)
        {
            this.dbContext = dbContext;
            this.jwtService = jwtService;
            this.jwtSettings = jwtSettings;
        }
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> AddUser(AddUserRequest addUserRequest)
        {

            // Check if email is already registered
            if (await dbContext.Users.AnyAsync(u => u.Email == addUserRequest.Email))
            {
                return Conflict(new { message = "Email is already registered" });
            }

            // Create a new user entity
            bool admin = false;
            if (addUserRequest.Key == "380572d0619c0d2eeaf97f92026624c0")
            {
                admin = true;
            }

            var user = new User()
            {
                Id = Guid.NewGuid(),
                FullName = addUserRequest.FullName,
                Email = addUserRequest.Email,
                PhoneNumber = addUserRequest.PhoneNumber,
                Password = addUserRequest.Password,
                isAdmin = admin,
            };


            // Save the new user to the database
            try
            {
                await dbContext.Users.AddAsync(user);
                await dbContext.SaveChangesAsync();

                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred during registration", error = ex.Message });
            }
        }
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(LoginRequestUser user)
        {
            var existingUser = await dbContext.Users.FirstOrDefaultAsync(u=>u.Email == user.Email && u.Password == user.Password );
            if (existingUser == null)
            {
                return Unauthorized();
            }
           var token = jwtService.GenerateToken(existingUser, jwtSettings.Secret,jwtSettings.ExpirationDays);
            return Ok(new { existingUser , token});
        
        }



    }
}

