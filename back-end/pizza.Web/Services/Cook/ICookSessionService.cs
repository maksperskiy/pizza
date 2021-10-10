using pizza.Data.Enums;
using pizza.Data.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace pizza.Web.Services.Cook
{
    public interface ICookSessionService
    {
        Task Create(Guid cookId);
        Task<IEnumerable<Data.Entities.CookSession>> Get(Guid cookId);
        Task<bool> CookExists(Guid cookId);
        Task<bool> Exists(Guid cookId);
        Task End(Guid cookId);
    }
}
