using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pizza.Services
{
    public interface IPizzaService
    {
        Task<Data.Entities.Name> CreateName(string value);
        Task<IEnumerable<Data.Entities.Name>> GetNames();
        Task RemoveName(Guid Id);
        Task<bool> NameExists(string value);
        Task<bool> NameExists(Guid Id);

        Task<Data.Entities.Type> CreateType(string value);
        Task<IEnumerable<Data.Entities.Type>> GetTypes();
        Task RemoveType(Guid Id);
        Task<bool> TypeExists(string value);
        Task<bool> TypeExists(Guid Id);

    }
}
