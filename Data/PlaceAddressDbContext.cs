using Microsoft.EntityFrameworkCore;

public class PlaceAddressDbContext : DbContext
{
    public PlaceAddressDbContext(DbContextOptions<PlaceAddressDbContext> options) : base(options)
    {
    }

    public DbSet<Places> Places { get; set; }
    public DbSet<AddressDetail> AddressDetails { get; set; }
}
