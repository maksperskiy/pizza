using pizza.Data.Enums;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace pizza.Data.Entities
{
    public class Cook
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid CookId { get; set; }

        public string Name { get; set; }

        public string Phone { get; set; }

        public Guid PostId { get; set; }

        [ForeignKey("PostId")]
        public virtual Entities.Post Post { get; set; }

        public Status CookStatus { get; set; }
    }
}
