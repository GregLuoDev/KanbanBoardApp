using KanbanBoard.WebAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace KanbanBoard.WebAPI.Database;

public class KanbanDbContext:DbContext
{
    public KanbanDbContext(DbContextOptions<KanbanDbContext> options) : base(options) { }

    protected KanbanDbContext()
    {
    }

    public DbSet<TaskItem> Tasks => Set<TaskItem>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        var currentDate = new DateTimeOffset(2025, 09, 11, 0, 0, 0, 0, TimeSpan.FromHours(0));
        modelBuilder.Entity<TaskItem>().HasData(
 new TaskItem() { Id = Guid.Parse("3846BD70-A0C3-4079-879D-EEA95554834C"), Title = "Implement API", Description="Implment Web API with .Net 9",CreatedAt= currentDate, UpdatedAt= currentDate });
        modelBuilder.Entity<TaskItem>().HasData(
 new TaskItem() { Id = Guid.Parse("3DB4947A-6B4C-4F22-935F-7A9845713AC0"), Title = "Implement UI", Description = "Implment UI with React 19", CreatedAt = currentDate, UpdatedAt = currentDate });

    }


    public override int SaveChanges()
    {
        UpdateTimestamps();
        return base.SaveChanges();
    }

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        UpdateTimestamps();
        return await base.SaveChangesAsync(cancellationToken);
    }

    private void UpdateTimestamps()
    {
        Console.WriteLine("============ChangeTracker.Entries()", ChangeTracker.Entries());
        var entries = ChangeTracker.Entries()
            .Where(e => e.State == EntityState.Added || e.State == EntityState.Modified);

        foreach (var entry in entries)
        {
            var entity = (TaskItem)entry.Entity;

            if (entry.State == EntityState.Added)
            {
                entity.CreatedAt = DateTime.UtcNow;
            }

            entity.UpdatedAt = DateTime.UtcNow;
        }
    }
}


// Add-Migration InitialCreate
// Update-Database
