using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace pizza.Data.Entities
{
    public class Name
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid NameId { get; set; }

        public string Value { get; set; }

        public byte[] Image { get; set; }
    }
}
