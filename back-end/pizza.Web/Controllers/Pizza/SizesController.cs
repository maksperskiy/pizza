using Microsoft.AspNetCore.Mvc;
using pizza.Data.Models;
using pizza.Web.Services.Pizza;
using System;
using System.Threading.Tasks;

namespace pizza.Web.Controllers.Pizza
{
    [ApiController]
    [Route("api/[controller]")]
    public class SizesController : ControllerBase
    {
        private readonly ISizeService _service;

        public SizesController(ISizeService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] CreateSizeRequest request)
        {
            if (await _service.Exists(value: request.Value, name: request.Name))
            {
                return Conflict("Size does already exist");
            }

            var result = await _service.Create(request.Value, request.Name);

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
            if (!await _service.Exists(Id))
            {
                return NotFound("Size does not exist");
            }

            if (await _service.PizzaExists(Id))
            {
                return BadRequest("Pizza with this size already exists");
            }

            await _service.Remove(Id);

            return Ok();
        }

        [HttpGet("{Id:Guid}/hide")]
        public async Task<IActionResult> Hide([FromRoute] Guid Id)
        {
            if (!await _service.Exists(Id))
            {
                return NotFound("Size does not exist");
            }

            await _service.Hide(Id);

            return Ok();
        }
    }
}
