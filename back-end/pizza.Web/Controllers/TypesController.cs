using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using pizza.Data.Models;
using pizza.Web.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pizza.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TypesController : ControllerBase
    {
        private readonly ITypeService _service;

        public TypesController(ITypeService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] CreateTypeRequest request)
        {
            if (await _service.Exists(value:request.Value))
            {
                return Conflict("Type does already exist");
            }

            var result = await _service.Create(request.Value);

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
                return NotFound("Type does not exist");
            }

            if (await _service.PizzaExists(Id))
            {
                return BadRequest("Pizza with this type already exists");
            }

            await _service.Remove(Id);

            return Ok();
        }

        [HttpGet("{Id:Guid}/hide")]
        public async Task<IActionResult> Hide([FromRoute] Guid Id)
        {
            if (!await _service.Exists(Id))
            {
                return NotFound("Type does not exist");
            }

            await _service.Hide(Id);

            return Ok();
        }
    }
}
