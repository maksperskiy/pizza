using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pizza.Web.Services
{
    public interface ICategoryService
    {
        Task<Data.Entities.Category> Create(string value);
        Task<IEnumerable<Data.Entities.Category>> Get();
        Task Remove(Guid Id);
        Task<bool> Exists(Guid? Id = null, string value=null);
        Task<bool> PizzaExists(Guid Id);
        Task Hide(Guid Id);
    }
}
