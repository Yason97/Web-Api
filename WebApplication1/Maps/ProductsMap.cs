using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity.ModelConfiguration;

namespace WebApplication1.Maps
{
    public class ProductsMap : EntityTypeConfiguration<Products>
    {
        public ProductsMap()
        {
            HasKey(t => t.ID);
            Property(t => t.Name).IsRequired();
            Property(t => t.Name).HasMaxLength(50);
            Property(t => t.Category).HasMaxLength(50);
        }
    }
}