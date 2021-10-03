using System;

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
