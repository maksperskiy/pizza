using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace pizza.Data.Entities
{
    public class Promo
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid PromoId { get; set; }

        public int Value { get; set; }

        public string PromoCode { get; set; }
    }
}
