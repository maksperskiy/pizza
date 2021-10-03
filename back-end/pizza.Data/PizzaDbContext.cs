using Microsoft.EntityFrameworkCore;
using pizza.Data.Entities;

namespace pizza.Data
{
    public class PizzaDbContext : DbContext
    {
        public PizzaDbContext(DbContextOptions options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<Name> Name { get; set; }
        public DbSet<Entities.Type> Type { get; set; }
        public DbSet<Size> Size { get; set; }
        public DbSet<Category> Category { get; set; }
        public DbSet<Entities.Pizza> Pizza { get; set; }
        public DbSet<OrderUnit> OrderUnit { get; set; }
        public DbSet<Order> Order { get; set; }
        public DbSet<Promo> Promo { get; set; }
        public DbSet<Customer> Customer { get; set; }
    }
}
