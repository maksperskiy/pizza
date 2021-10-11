using pizza.Data.Enums;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace pizza.Data.Entities
{
    public class Order
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid OrderId { get; set; }

        public Guid CustomerId { get; set; }

        [ForeignKey("CustomerId")]
        public virtual Customer Customer { get; set; }

        public string Address { get; set; }

        public DateTime DateTime { get; set; }

        public Guid? PromoId { get; set; }

        [ForeignKey("PromoId")]
        public virtual Promo Promo { get; set; }

        public Guid? CookSessionId { get; set; }

        [ForeignKey("CookSessionId")]
        public virtual CookSession CookSession { get; set; }

        public Status OrderStatus { get; set; }
    }
}
