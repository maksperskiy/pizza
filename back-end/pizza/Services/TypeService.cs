using Microsoft.EntityFrameworkCore;
using pizza.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pizza.Services
{
    public class TypeService : ITypeService
    {
        private readonly PizzaDbContext _context;

        public TypeService(PizzaDbContext context)
        {
            _context = context;
        }

        public async Task<Data.Entities.Type> Create(string value)
        {
            var type = new Data.Entities.Type { Value = value };

            await _context.Type.AddAsync(type);
            await _context.SaveChangesAsync();

            return type;
        }

        public async Task<IEnumerable<Data.Entities.Type>> Get()
        {
            return await _context.Type.ToListAsync();
        }

        public async Task Remove(Guid Id)
        {
            var type = await _context.Type.FindAsync(Id);
            _context.Type.Remove(type);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> Exists(Guid? Id=null, string value=null)
        {
            if (Id != null)
            {
                return await _context.Type.AnyAsync(x => x.TypeId == Id);
            }

            return await _context.Type.AnyAsync(x => x.Value == value);
        }
    }
}
