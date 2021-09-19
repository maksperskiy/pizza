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
    public class NamesController : ControllerBase
    {
        private readonly INameService _service;

        public NamesController(INameService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] CreateNameRequest request)
        {
            if (await _service.Exists(value:request.Value))
            {
                return Conflict("Name does already exist");
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
                return NotFound("Name does not exist");
            }

            await _service.Remove(Id);

            return Ok();
        }
    }
}
