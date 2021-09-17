using pizza.Data.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pizza.Data.Entities
{
    public class Name
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid NameId { get; set; }

        public string Value { get; set; }
    }
}
