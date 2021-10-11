using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pizza.Data.Models.Order
{
    public class OrderModel
    {
        public Guid OrderId { get; set; }

        public Entities.CookSession CookSession { get; set; }

        public Enums.Status Status { get; set; }

        public Entities.Customer Customer { get; set; }

        public IEnumerable<Entities.Pizza> Pizzas { get; set; }

        public string Address { get; set; }

        public Entities.Promo Promo { get; set; }

        public decimal Price { get; set; }
    }
}
