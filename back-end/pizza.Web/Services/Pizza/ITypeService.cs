using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace pizza.Web.Services.Pizza
{
    public interface ITypeService
    {
        Task<Data.Entities.Type> Create(string value);
        Task<IEnumerable<Data.Entities.Type>> Get();
        Task Remove(Guid Id);
        Task<bool> Exists(Guid? Id = null, string value = null);
        Task<bool> PizzaExists(Guid Id);
        Task Hide(Guid Id);
    }
}
