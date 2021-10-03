using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace pizza.Data.Entities
{
    public class Size
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid SizeId { get; set; }

        public int Value { get; set; }

        public string Name { get; set; }
    }
}
