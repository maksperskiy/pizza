using Microsoft.EntityFrameworkCore;
using pizza.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pizza.Web.Services.Order
{
    public class PromoService : IPromoService
    {
        private readonly PizzaDbContext _context;

        public PromoService(PizzaDbContext context)
        {
            _context = context;
        }

        public async Task<Data.Entities.Promo> Create(int value, string code)
        {
            var promo = new Data.Entities.Promo { Value = value, PromoCode = code };

            await _context.Promo.AddAsync(promo);
            await _context.SaveChangesAsync();

            return promo;
        }

        public async Task<IEnumerable<Data.Entities.Promo>> Get()
        {
            return await _context.Promo.ToListAsync();
        }

        public async Task Remove(Guid Id)
        {
            var promo = await _context.Promo.FindAsync(Id);
            _context.Promo.Remove(promo);
            await _context.SaveChangesAsync();
        }
    }
}
