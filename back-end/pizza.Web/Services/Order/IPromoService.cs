using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace pizza.Web.Services.Order
{
    public interface IPromoService
    {
        Task<Data.Entities.Promo> Create(int value, string code);
        Task<IEnumerable<Data.Entities.Promo>> Get();
        Task Remove(Guid Id);
    }
}
