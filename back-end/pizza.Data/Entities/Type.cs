using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace pizza.Data.Entities
{
    public class Type
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid TypeId { get; set; }

        public string Value { get; set; }
    }
}
