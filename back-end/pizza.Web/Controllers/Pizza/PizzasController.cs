using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using pizza.Data.Models;
using pizza.Web.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pizza.Web.Controllers.Pizza
{
    [ApiController]
    [Route("api/[controller]")]
    public class PizzasController : ControllerBase
    {
        private readonly IPizzaService _service;

        public PizzasController(IPizzaService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] CreatePizzaRequest request)
        {
            /*if (await _service.Exists(value: request.Value, name: request.Name))
            {
                return Conflict("Size does already exist");
            }*/

            var result = await _service.Create(request);

            return Ok(result);
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAll()
        {
            var result = await _service.GetAll();
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
                return NotFound("Pizza does not exist");
            }

            await _service.Remove(Id);

            return Ok();
        }
    }
}
