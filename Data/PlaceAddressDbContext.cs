using Microsoft.EntityFrameworkCore;

public class PlaceAddressDbContext : DbContext
{
    public PlaceAddressDbContext(DbContextOptions<PlaceAddressDbContext> options) : base(options)
    {
    }

    public DbSet<Places> Places { get; set; }
    public DbSet<AddressDetail> AddressDetails { get; set; }

    public override int SaveChanges()
    {
        UpdateTimestamps();
        return base.SaveChanges();
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        UpdateTimestamps();
        return base.SaveChangesAsync(cancellationToken);
    }

    private void UpdateTimestamps()
    {
        var entries = ChangeTracker.Entries()
            .Where(e => e.Entity is Places || e.Entity is AddressDetail)
            .Where(e => e.State == EntityState.Added || e.State == EntityState.Modified);

        foreach (var entry in entries)
        {
            if (entry.State == EntityState.Added)
            {
                ((dynamic)entry.Entity).CreatedAt = DateTime.UtcNow;
            }
            ((dynamic)entry.Entity).UpdatedAt = DateTime.UtcNow;
        }
    }
}
