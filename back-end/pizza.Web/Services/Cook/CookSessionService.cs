using Microsoft.EntityFrameworkCore;
using pizza.Data;
using pizza.Data.Enums;
using pizza.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pizza.Web.Services.Cook
{
    public class CookSessionService : ICookSessionService
    {
        private readonly PizzaDbContext _context;

        public CookSessionService(PizzaDbContext context)
        {
            _context = context;
        }

        public async Task Create(Guid cookId)
        {
            var session = new Data.Entities.CookSession
            {
                CookId = cookId,
                DateTimeStart = DateTime.Now
            };

            var cook = await _context.Cook.FindAsync(cookId);
            cook.CookStatus = Status.InProgress;

            await _context.CookSession.AddAsync(session);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Data.Entities.CookSession>> Get(Guid cookId)
        {
            return await _context.CookSession.Where(x => x.CookId == cookId).ToListAsync();
        }

        public async Task<bool> CookExists(Guid Id)
        {
            return await _context.Cook.AnyAsync(x => x.CookId == Id);
        }

        public async Task<bool> Exists(Guid cookId)
        {
            return await _context.CookSession.AnyAsync(x => x.CookId == cookId && x.DateTimeEnd == null);
        }

        public async Task End(Guid cookId)
        {
            var session = await _context.CookSession.SingleOrDefaultAsync(x => x.CookId == cookId && x.DateTimeEnd == null);
            var cook = await _context.Cook.FindAsync(cookId);
            cook.CookStatus = Status.Paused;
            session.DateTimeEnd = DateTime.Now;
            await _context.SaveChangesAsync();
        }
    }
}
