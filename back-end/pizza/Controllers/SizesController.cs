using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using pizza.Data.Models;
using pizza.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pizza.Controllers
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
            if (await _service.Exists(value:request.Value, name:request.Name))
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

            await _service.Remove(Id);

            return Ok();
        }
    }
}
