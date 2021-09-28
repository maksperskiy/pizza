﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pizza.Web.Services
{
    public interface ISizeService
    {
        Task<Data.Entities.Size> Create(int value, string name);
        Task<IEnumerable<Data.Entities.Size>> Get();
        Task Remove(Guid Id);
        Task<bool> Exists(Guid? Id = null, int? value=null, string name=null);
        Task<bool> PizzaExists(Guid Id);
        Task Hide(Guid Id);
    }
}
