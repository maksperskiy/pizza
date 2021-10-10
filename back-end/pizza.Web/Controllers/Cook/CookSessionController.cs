using Microsoft.AspNetCore.Mvc;
using pizza.Data.Models;
using pizza.Web.Services.Cook;
using System;
using System.Threading.Tasks;

namespace pizza.Web.Controllers.Cook
{
    [ApiController]
    [Route("api/[controller]")]
    public class CookSessionController : ControllerBase
    {
        private readonly ICookSessionService _service;

        public CookSessionController(ICookSessionService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] CookSessionRequest request)
        {
            if (!await _service.CookExists(request.CookId))
            {
                return NotFound("Cook not exists");
            }

            if (await _service.Exists(request.CookId))
            {
                return Conflict("Session already exists");
            }

            await _service.Create(request.CookId);

            return Ok();
        }

        [HttpGet("{cookId:Guid}")]
        public async Task<IActionResult> Get([FromRoute] Guid cookId)
        {
            if (!await _service.CookExists(cookId))
            {
                return NotFound("Cook not exists");
            }

            var result = await _service.Get(cookId);
            return Ok(result);
        }

        [HttpPut("{cookId:Guid}/end")]
        public async Task<IActionResult> End([FromRoute] Guid cookId)
        {
            if (!await _service.Exists(cookId))
            {
                return NotFound("Session not exists");
            }

            await _service.End(cookId);

            return Ok();
        }
    }
}
