using pizza.Data.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace pizza.Web.Services.Pizza
{
    public interface IPizzaService
    {
        Task<Data.Entities.Pizza> Create(CreatePizzaRequest request);
        Task<IEnumerable<Data.Entities.Pizza>> GetAll();
        Task<IEnumerable<Data.Entities.Pizza>> Get();
        Task Remove(Guid Id);
        Task<bool> Exists(Guid? Id = null, CreatePizzaRequest request = null);
        Task Hide(Guid id);
    }
}
