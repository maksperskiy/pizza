using pizza.Data.Enums;
using pizza.Data.Models.Order;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pizza.Web.Services.Order
{
    public interface IOrderService
    {
        Task Create(CreateOrderRequest request);
        Task<IEnumerable<OrderModel>> GetOrders();
        Task AssignOrder(Guid Id, Guid cookSessionId);
        Task Status(Guid Id, Status status);
        Task<bool> PromoExists(string promo);
        Task<IEnumerable<OrderModel>> GetCustomer(Guid Id);
        Task<IEnumerable<Data.Entities.Customer>> GetCustomers();
    }
}
