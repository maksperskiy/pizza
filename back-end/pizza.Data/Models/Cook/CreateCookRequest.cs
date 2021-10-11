using pizza.Data.Enums;
using System;

namespace pizza.Data.Models
{
    public class CreateCookRequest
    {
        public string Name { get; set; }
        public string Phone { get; set; }
        public Guid PostId { get; set; }
    }
}
