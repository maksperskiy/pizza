using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using pizza.Data;
using pizza.Data.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace pizza.Web.Services
{
    public class PizzaService : IPizzaService
    {
        private readonly PizzaDbContext _context;

        public PizzaService(PizzaDbContext context)
        {
            _context = context;
        }

        public async Task<Data.Entities.Pizza> Create(CreatePizzaRequest request)
        {
            var pizza = new Data.Entities.Pizza 
            { 
                Name = _context.Name.Single(x => x.NameId == request.NameId),
                Type = _context.Type.Single(x => x.TypeId == request.TypeId),
                Size = _context.Size.Single(x => x.SizeId == request.SizeId),
                Category = _context.Category.Single(x => x.CategoryId == request.CategoryId),
                Price = request.Price,
                Visible = request.Visible
            };

            await _context.Pizza.AddAsync(pizza);
            await _context.SaveChangesAsync();

            return pizza;
        }

        public async Task<IEnumerable<Data.Entities.Pizza>> Get()
        {
            return await _context.Pizza.Where(x => x.Visible == true).ToListAsync();
        }

        public async Task<IEnumerable<Data.Entities.Pizza>> GetAll()
        {
            return await _context.Pizza.ToListAsync();
        }

        public async Task Remove(Guid Id)
        {
            var pizza = await _context.Pizza.FindAsync(Id);
            _context.Pizza.Remove(pizza);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> Exists(Guid? Id = null, CreatePizzaRequest request = null)
        {
            return await _context.Pizza.AnyAsync(x => x.PizzaId == Id);
        }
    }
}
