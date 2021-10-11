using pizza.Data.Enums;
using pizza.Data.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace pizza.Web.Services.Cook
{
    public interface ICookService
    {
        Task<Data.Entities.Cook> Create(CreateCookRequest request);
        Task<IEnumerable<Data.Entities.Cook>> Get();
        Task Remove(Guid Id);
        Task<bool> CookExists(Guid Id);
        Task<bool> Exists(Guid? Id = null, string name = null, string phone = null);
        Task Status(Guid Id, Status status);
        Task Post(Guid Id, Guid post);
    }
}
