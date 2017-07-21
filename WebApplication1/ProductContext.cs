namespace WebApplication1
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class ProductContext : DbContext
    {
        public ProductContext()
            : base("name=ProductContext")
        {
            this.Configuration.ProxyCreationEnabled = false;
            this.Configuration.LazyLoadingEnabled = false;
        }

        public virtual DbSet<Products> Products { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Products>().HasKey(t => t.ID);
            modelBuilder.Entity<Products>().Property(t => t.Name).IsRequired();
            modelBuilder.Entity<Products>().Property(t => t.Name).HasMaxLength(30);
            modelBuilder.Entity<Products>().Property(t => t.Category).HasMaxLength(30);      
        }
    }
}
