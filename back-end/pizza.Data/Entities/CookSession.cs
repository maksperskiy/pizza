using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace pizza.Data.Entities
{
    public class CookSession
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid CookSessionId { get; set; }

        public Guid CookId { get; set; }

        [ForeignKey("CookId")]
        public virtual Entities.Cook Cook { get; set; }

        public DateTime DateTimeStart { get; set; }

        public DateTime DateTimeEnd { get; set; }
    }
}
