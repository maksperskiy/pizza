using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace pizza.Web.Services.Pizza
{
    public interface INameService
    {
        Task<Data.Entities.Name> Create(string value, IFormFile image);
        Task<IEnumerable<Data.Entities.Name>> Get();
        Task Remove(Guid Id);
        Task<bool> Exists(Guid? Id = null, string value = null);
        Task<bool> PizzaExists(Guid Id);
        Task Hide(Guid Id);
    }
}
