using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pizza.Services
{
    public interface ITypeService
    {
        Task<Data.Entities.Type> Create(string value);
        Task<IEnumerable<Data.Entities.Type>> Get();
        Task Remove(Guid Id);
        Task<bool> Exists(Guid? Id=null, string value=null);
    }
}
