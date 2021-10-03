using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace pizza.Data.Entities
{
    public class Post
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid PostId { get; set; }

        public string Value { get; set; }
    }
}
