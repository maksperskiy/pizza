using Microsoft.EntityFrameworkCore;
using pizza.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pizza.Web.Services.Cook
{
    public class PostService : IPostService
    {
        private readonly PizzaDbContext _context;

        public PostService(PizzaDbContext context)
        {
            _context = context;
        }

        public async Task<Data.Entities.Post> Create(string value)
        {
            var post = new Data.Entities.Post { Value = value };

            await _context.Post.AddAsync(post);
            await _context.SaveChangesAsync();

            return post;
        }

        public async Task<IEnumerable<Data.Entities.Post>> Get()
        {
            return await _context.Post.ToListAsync();
        }

        public async Task Remove(Guid Id)
        {
            var post = await _context.Post.FindAsync(Id);
            _context.Post.Remove(post);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> CookExists(Guid Id)
        {
            return await _context.Cook.AnyAsync(x => x.PostId == Id);
        }

        public async Task<bool> Exists(Guid? Id = null, string value = null)
        {
            if (Id != null)
            {
                return await _context.Post.AnyAsync(x => x.PostId == Id);
            }

            if (value != null)
            {
                return await _context.Post.AnyAsync(x => x.Value == value);
            }

            return false;
        }
    }
}
