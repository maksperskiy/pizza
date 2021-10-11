using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pizza.Data.Models.Order
{
    public class CreateOrderRequest
    {
        public string Name { get; set; }
        
        public string Mail { get; set; }
        
        public string Address { get; set; }
        
        public string Phone { get; set; }

        public string Promo { get; set; }

        public IEnumerable<Guid> Pizzas { get; set; }
    }
}
