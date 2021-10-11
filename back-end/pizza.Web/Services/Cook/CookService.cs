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
    public class CookService : ICookService
    {
        private readonly PizzaDbContext _context;

        public CookService(PizzaDbContext context)
        {
            _context = context;
        }

        public async Task<Data.Entities.Cook> Create(CreateCookRequest request)
        {
            var cook = new Data.Entities.Cook
            {
                Name = request.Name,
                Phone = request.Phone,
                CookStatus = Data.Enums.Status.Pending,
                PostId = request.PostId
            };

            await _context.Cook.AddAsync(cook);
            await _context.SaveChangesAsync();

            return cook;
        }

        public async Task<IEnumerable<Data.Entities.Cook>> Get()
        {
            return await _context.Cook.ToListAsync();
        }

        public async Task Remove(Guid Id)
        {
            var cook = await _context.Cook.FindAsync(Id);
            _context.Cook.Remove(cook);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> CookExists(Guid Id)
        {
            return await _context.Cook.AnyAsync(x => x.PostId == Id);
        }

        public async Task<bool> Exists(Guid? Id = null, string name = null, string phone = null)
        {
            if (Id != null)
            {
                return await _context.Cook.AnyAsync(x => x.CookId == Id);
            }

            if (name != null && phone != null)
            {
                return await _context.Cook.AnyAsync(x => x.Name == name && x.Phone == phone);
            }

            return false;
        }

        public async Task Status(Guid Id, Status status)
        {
            var cook = await _context.Cook.FindAsync(Id);
            cook.CookStatus = status;
            await _context.SaveChangesAsync();
        }

        public async Task Post(Guid Id, Guid post)
        {
            var cook = await _context.Cook.FindAsync(Id);
            cook.PostId = post;
            await _context.SaveChangesAsync();
        }
    }
}
