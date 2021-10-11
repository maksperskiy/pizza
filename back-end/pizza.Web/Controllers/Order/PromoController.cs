using Microsoft.AspNetCore.Mvc;
using pizza.Data.Models;
using pizza.Data.Models.Order;
using pizza.Web.Services.Order;
using pizza.Web.Services.Pizza;
using System;
using System.Threading.Tasks;

namespace pizza.Web.Controllers.Pizza
{
    [ApiController]
    [Route("api/[controller]")]
    public class PromoController : ControllerBase
    {
        private readonly IPromoService _service;

        public PromoController(IPromoService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] CreatePromoRequest request)
        {
            var result = await _service.Create(request.Value, request.PromoCode);

            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var result = await _service.Get();

            return Ok(result);
        }

        [HttpDelete("{Id:Guid}")]
        public async Task<IActionResult> Remove([FromRoute] Guid Id)
        {
            await _service.Remove(Id);

            return Ok();
        }
    }
}
