using Microsoft.AspNetCore.Mvc;
using pizza.Data.Models;
using pizza.Data.Models.Order;
using pizza.Web.Services.Order;
using pizza.Web.Services.Pizza;
using System;
using System.Threading.Tasks;

namespace pizza.Web.Controllers.Order
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _service;

        public OrderController(IOrderService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] CreateOrderRequest request)
        {
            if (request.Promo != null && !await _service.PromoExists(request.Promo))
            {
                return Conflict("Promo not exists");
            }

            await _service.Create(request);

            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var result = await _service.GetOrders();

            return Ok(result);
        }

        [HttpPut("{Id:Guid}/status")]
        public async Task<IActionResult> Status([FromRoute] Guid Id, [FromBody] ChangeStatusRequest request)
        {
            await _service.Status(Id, request.Status);

            return Ok();
        }

        [HttpPut("{Id:Guid}/assign")]
        public async Task<IActionResult> Assign([FromRoute] Guid Id, [FromBody] AssignOrderRequest request)
        {
            await _service.AssignOrder(Id, request.CookSessionId);

            return Ok();
        }
    }
}
