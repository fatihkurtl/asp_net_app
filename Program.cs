using asp_net_app.DTOs;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using System.Text.Json.Serialization;



var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });

    c.MapType<PlaceCreateDto>(() => new OpenApiSchema 
    { 
        Type = "object", 
        Properties = new Dictionary<string, OpenApiSchema>
        {
            ["placeName"] = new OpenApiSchema { Type = "string" },
            ["addressId"] = new OpenApiSchema { Type = "integer", Format = "int32", Nullable = true }
        }
    });
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;
});
builder.Services.AddDbContext<PlaceAddressDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(
    //    options =>
    //{
    //    options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
    //    options.RoutePrefix = string.Empty;
    //    options.DocumentTitle = "My Swagger";
    //}
    );
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
