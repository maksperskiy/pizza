using Microsoft.EntityFrameworkCore;
using pizza.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pizza.Services
{
    public class PizzaService : IPizzaService
    {
        private readonly PizzaDbContext _context;

        public PizzaService(PizzaDbContext context)
        {
            _context = context;
        }

        public async Task<Data.Entities.Name> CreateName(string value)
        {
            var name = new Data.Entities.Name { Value = value };

            await _context.Name.AddAsync(name);
            await _context.SaveChangesAsync();

            return name;
        }

        public async Task<IEnumerable<Data.Entities.Name>> GetNames()
        {
            return await _context.Name.ToListAsync();
        }

        public async Task RemoveName(Guid Id)
        {
            var name = await _context.Name.FindAsync(Id);
            _context.Name.Remove(name);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> NameExists(string value)
        {
            return await _context.Name.AnyAsync(x => x.Value == value);
        }

        public async Task<bool> NameExists(Guid Id)
        {
            return await _context.Name.AnyAsync(x => x.NameId == Id);
        }

        public async Task<Data.Entities.Type> CreateType(string value)
        {
            var type = new Data.Entities.Type { Value = value };

            await _context.Type.AddAsync(type);
            await _context.SaveChangesAsync();

            return type;
        }

        public async Task<IEnumerable<Data.Entities.Type>> GetTypes()
        {
            return await _context.Type.ToListAsync();
        }

        public async Task RemoveType(Guid Id)
        {
            var name = await _context.Type.FindAsync(Id);
            _context.Type.Remove(name);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> TypeExists(string value)
        {
            return await _context.Type.AnyAsync(x => x.Value == value);
        }

        public async Task<bool> TypeExists(Guid Id)
        {
            return await _context.Type.AnyAsync(x => x.TypeId == Id);
        }
    }
}
