using Microsoft.EntityFrameworkCore;
using pizza.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pizza.Web.Services.Pizza
{
    public class CategoryService : ICategoryService
    {
        private readonly PizzaDbContext _context;

        public CategoryService(PizzaDbContext context)
        {
            _context = context;
        }

        public async Task<Data.Entities.Category> Create(string value)
        {
            var category = new Data.Entities.Category { Value = value };

            await _context.Category.AddAsync(category);
            await _context.SaveChangesAsync();

            return category;
        }

        public async Task<IEnumerable<Data.Entities.Category>> Get()
        {
            return await _context.Category.ToListAsync();
        }

        public async Task Remove(Guid Id)
        {
            var category = await _context.Category.FindAsync(Id);
            _context.Category.Remove(category);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> Exists(Guid? Id = null, string value = null)
        {
            if (Id != null)
            {
                return await _context.Category.AnyAsync(x => x.CategoryId == Id);
            }

            return await _context.Category.AnyAsync(x => x.Value == value);
        }

        public async Task<bool> PizzaExists(Guid Id)
        {
            return await _context.Pizza.AnyAsync(x => x.CategoryId == Id);
        }

        public async Task Hide(Guid Id)
        {
            await _context.Pizza.Where(x => x.CategoryId == Id).ForEachAsync(x => x.Visible = false);
            _context.SaveChanges();
        }
    }
}
