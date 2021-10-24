using Microsoft.EntityFrameworkCore;
using pizza.Data;
using pizza.Data.Enums;
using pizza.Data.Models.Order;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pizza.Web.Services.Order
{
    public class OrderService : IOrderService
    {
        private readonly PizzaDbContext _context;

        public OrderService(PizzaDbContext context)
        {
            _context = context;
        }

        public async Task AssignOrder(Guid Id, Guid cookSessionId)
        {
            var order = await _context.Order.FindAsync(Id);
            order.CookSessionId = cookSessionId;
            order.OrderStatus = Data.Enums.Status.InProgress;
            await _context.SaveChangesAsync();
        }

        public async Task Create(CreateOrderRequest request)
        {
            var customer = await _context.Customer.SingleOrDefaultAsync(x => x.Name == request.Name && x.Mail == request.Mail && x.Phone == request.Phone);
            
            if (customer == null)
            {
                customer = new Data.Entities.Customer
                {
                    Name = request.Name,
                    Mail = request.Mail,
                    Phone = request.Phone
                };
                await _context.Customer.AddAsync(customer);
                await _context.SaveChangesAsync();
            }

            var order = new Data.Entities.Order
            {
                Customer = customer,
                Address = request.Address,
                Promo = _context.Promo.SingleOrDefault(x => x.PromoCode == request.Promo),
                OrderStatus = Data.Enums.Status.Pending,
                DateTime = DateTime.Now,
                CookSession = null,
            };

            await _context.Order.AddAsync(order);
            await _context.SaveChangesAsync();

            foreach (var pizza in request.Pizzas)
            {
                var orderUnit = new Data.Entities.OrderUnit
                { 
                    Pizza = _context.Pizza.SingleOrDefault(x => x.PizzaId == pizza),
                    Order = order
                };
                await _context.OrderUnit.AddAsync(orderUnit);
                await _context.SaveChangesAsync();
            }

            await _context.OrderUnit.Where(x => x.OrderId == order.OrderId).Select(x => x.Pizza).ForEachAsync(x => x.Rating += 1);
        }

        public async Task<IEnumerable<OrderModel>> GetOrders()
        {
            var orders = new List<OrderModel>();

            foreach (var order in _context.Order.Include(x => x.Promo).Include(x => x.CookSession).Include(x => x.Customer).ToList())
            {
                var pizzas = await _context.OrderUnit
                    .Include(x => x.Pizza.Category)
                    .Include(x => x.Pizza.Size)
                    .Include(x => x.Pizza.Name)
                    .Include(x => x.Pizza.Type)
                    .Where(x => x.OrderId == order.OrderId).Select(x => x.Pizza)
                    .ToListAsync();

                var orderModel = new OrderModel
                {
                    OrderId = order.OrderId,
                    Customer = order.Customer,
                    Address = order.Address,
                    CookSession = order.CookSession,
                    Promo = order.Promo,
                    Pizzas = pizzas,
                    Status = order.OrderStatus,
                    Price = _context.OrderUnit.Include(x => x.Pizza).Where(x => x.OrderId == order.OrderId).Select(x => x.Pizza.Price).Sum() * (1 - ((order.Promo == null) ? 0 : (decimal)order.Promo.Value)/100)
                };

                orders.Add(orderModel);
            }

            return orders;
        }

        public async Task<IEnumerable<Data.Entities.Customer>> GetCustomers()
        {
            return await _context.Customer.ToListAsync();
        }
        
        public async Task<IEnumerable<Data.Models.Order.OrderModel>> GetCustomer(Guid Id)
        {
            var orders = new List<OrderModel>();

            foreach (var order in _context.Order.Include(x => x.Promo).Include(x => x.CookSession).Include(x => x.Customer).Where(x => x.CustomerId == Id).ToList())
            {
                var pizzas = await _context.OrderUnit
                    .Include(x => x.Pizza.Category)
                    .Include(x => x.Pizza.Size)
                    .Include(x => x.Pizza.Name)
                    .Include(x => x.Pizza.Type)
                    .Where(x => x.OrderId == order.OrderId).Select(x => x.Pizza)
                    .ToListAsync();

                var orderModel = new OrderModel
                {
                    OrderId = order.OrderId,
                    Customer = order.Customer,
                    Address = order.Address,
                    CookSession = order.CookSession,
                    Promo = order.Promo,
                    Pizzas = pizzas,
                    Status = order.OrderStatus,
                    Price = _context.OrderUnit.Include(x => x.Pizza).Where(x => x.OrderId == order.OrderId).Select(x => x.Pizza.Price).Sum() * (1 - ((order.Promo == null) ? 0 : (decimal)order.Promo.Value)/100)
                };

                orders.Add(orderModel);
            }

            return orders;
        }

        public async Task<bool> PromoExists(string promo)
        {
            return await _context.Promo.AnyAsync(x => x.PromoCode == promo);
        }

        public async Task Status(Guid Id, Status status)
        {
            var order = await _context.Order.FindAsync(Id);
            order.OrderStatus = status;
            await _context.SaveChangesAsync();
        }
    }
}
