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

namespace pizza.Services
{
    public class PizzaService : IPizzaService
    {
        private readonly PizzaDbContext _context;
        private readonly IWebHostEnvironment _appEnvironment;

        public PizzaService(PizzaDbContext context, IWebHostEnvironment appEnvironment)
        {
            _context = context;
            _appEnvironment = appEnvironment;
        }

        public async Task<Data.Entities.Pizza> Create(CreatePizzaRequest request, IFormFile image)
        {
            byte[] imageData = null;
            // считываем переданный файл в массив байтов
            using (var binaryReader = new BinaryReader(image.OpenReadStream()))
            {
                imageData = binaryReader.ReadBytes((int)image.Length);
            }

            var pizza = new Data.Entities.Pizza 
            { 
                Name = _context.Name.Single(x => x.NameId == request.NameId),
                Type = _context.Type.Single(x => x.TypeId == request.TypeId),
                Size = _context.Size.Single(x => x.SizeId == request.SizeId),
                Image = imageData,
                Price = request.Price,
                Category = request.Category
            };

            await _context.Pizza.AddAsync(pizza);
            await _context.SaveChangesAsync();

            return pizza;
        }

        public async Task<IEnumerable<Data.Entities.Pizza>> Get()
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
