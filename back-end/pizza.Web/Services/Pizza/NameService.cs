using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using pizza.Data;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace pizza.Web.Services.Pizza
{
    public class NameService : INameService
    {
        private readonly PizzaDbContext _context;

        public NameService(PizzaDbContext context)
        {
            _context = context;
        }

        public async Task<Data.Entities.Name> Create(string value, IFormFile image)
        {
            byte[] imageData = null;
            // считываем переданный файл в массив байтов
            using (var binaryReader = new BinaryReader(image.OpenReadStream()))
            {
                imageData = binaryReader.ReadBytes((int)image.Length);
            }

            var name = new Data.Entities.Name { Value = value, Image = imageData };

            await _context.Name.AddAsync(name);
            await _context.SaveChangesAsync();

            return name;
        }

        public async Task<IEnumerable<Data.Entities.Name>> Get()
        {
            return await _context.Name.ToListAsync();
        }

        public async Task Remove(Guid Id)
        {
            var name = await _context.Name.FindAsync(Id);
            _context.Name.Remove(name);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> Exists(Guid? Id = null, string value = null)
        {
            if (Id != null)
            {
                return await _context.Name.AnyAsync(x => x.NameId == Id);
            }

            return await _context.Name.AnyAsync(x => x.Value == value);
        }

        public async Task<bool> PizzaExists(Guid Id)
        {
            return await _context.Pizza.AnyAsync(x => x.NameId == Id);
        }

        public async Task Hide(Guid Id)
        {
            await _context.Pizza.Where(x => x.NameId == Id).ForEachAsync(x => x.Visible = false);
            _context.SaveChanges();
        }
    }
}
