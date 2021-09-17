using Microsoft.AspNetCore.Http;
using pizza.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pizza.Services
{
    public interface IPizzaService
    {
        Task<Data.Entities.Pizza> Create(CreatePizzaRequest request, IFormFile image);
        Task<IEnumerable<Data.Entities.Pizza>> Get();
        Task Remove(Guid Id);
        Task<bool> Exists(Guid? Id=null, CreatePizzaRequest request=null);
    }
}
