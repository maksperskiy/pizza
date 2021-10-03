using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace pizza.Web.Services.Cook
{
    public interface IPostService
    {
        Task<Data.Entities.Post> Create(string value);
        Task<IEnumerable<Data.Entities.Post>> Get();
        Task Remove(Guid Id);
        Task<bool> CookExists(Guid Id);
        Task<bool> Exists(Guid? Id = null, string value = null);
    }
}
