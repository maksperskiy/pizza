using Microsoft.EntityFrameworkCore;
using pizza.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pizza.Services
{
    public class SizeService : ISizeService
    {
        private readonly PizzaDbContext _context;

        public SizeService(PizzaDbContext context)
        {
            _context = context;
        }

        public async Task<Data.Entities.Size> Create(int value, string name)
        {
            var size = new Data.Entities.Size { Value = value, Name = name };

            await _context.Size.AddAsync(size);
            await _context.SaveChangesAsync();

            return size;
        }

        public async Task<IEnumerable<Data.Entities.Size>> Get()
        {
            return await _context.Size.ToListAsync();
        }

        public async Task Remove(Guid Id)
        {
            var size = await _context.Size.FindAsync(Id);
            _context.Size.Remove(size);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> Exists(Guid? Id=null, int? value=null, string name=null)
        {
            if (Id != null)
            {
                return await _context.Size.AnyAsync(x => x.SizeId == Id);
            }

            if (value != null)
            {
                return await _context.Size.AnyAsync(x => x.Value == value);
            }

            if (name != null)
            {
                return await _context.Size.AnyAsync(x => x.Name == name);
            }

            return false;
        }
    }
}
