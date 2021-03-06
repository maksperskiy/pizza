using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace pizza.Data.Entities
{
    public class Pizza
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid PizzaId { get; set; }

        public Guid NameId { get; set; }

        [ForeignKey("NameId")]
        public virtual Name Name { get; set; }

        public Guid TypeId { get; set; }

        [ForeignKey("TypeId")]
        public virtual Entities.Type Type { get; set; }

        public Guid SizeId { get; set; }

        [ForeignKey("SizeId")]
        public virtual Size Size { get; set; }

        public Guid CategoryId { get; set; }

        [ForeignKey("CategoryId")]
        public virtual Category Category { get; set; }

        public decimal Price { get; set; }

        public float Rating { get; set; }

        public bool Visible { get; set; }
    }
}
