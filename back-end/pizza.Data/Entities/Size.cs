﻿using pizza.Data.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pizza.Data.Entities
{
    public class Size
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid SizeId { get; set; }

        public int Value { get; set; }

        public string Name { get; set; }
    }
}
