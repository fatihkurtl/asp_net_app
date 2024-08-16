namespace asp_net_app.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using asp_net_app.DTOs;
    using System.IdentityModel.Tokens.Jwt;
    using Microsoft.IdentityModel.Tokens;
    using System.Text;
    using System.Security.Claims;

    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto loginDto)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("oJx5cdKbp96T7stHTTaGERmcFAiivdr60sTjPdRlDhvReokpfk8zVGEZOBgQCTgT");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, "username")
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                Issuer = "https://fatihkurt.com",
                Audience = "https://fatihkurt.com",
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return Ok(new { Token = tokenString });
        }
    }
}
