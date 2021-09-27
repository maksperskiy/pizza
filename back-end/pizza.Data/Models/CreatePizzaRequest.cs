using Microsoft.AspNetCore.Http;
using pizza.Data.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pizza.Data.Models
{
    public class CreatePizzaRequest
    {
        public Guid NameId { get; set; }

        public Guid TypeId { get; set; }

        public Guid SizeId { get; set; }

        public Guid CategoryId { get; set; }

        public decimal Price { get; set; }

        public bool Visible { get; set; }
    }
}
