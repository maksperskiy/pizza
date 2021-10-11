using Microsoft.AspNetCore.Mvc;
using pizza.Data.Models;
using pizza.Data.Models.Order;
using pizza.Web.Services.Cook;
using System;
using System.Threading.Tasks;

namespace pizza.Web.Controllers.Cook
{
    [ApiController]
    [Route("api/[controller]")]
    public class CookController : ControllerBase
    {
        private readonly ICookService _service;

        public CookController(ICookService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] CreateCookRequest request)
        {
            if (await _service.Exists(name: request.Name, phone: request.Phone))
            {
                return Conflict("This cook already exists");
            }

            var result = await _service.Create(request);

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
                return NotFound("Cook not exists");
            }

            await _service.Remove(Id);

            return Ok();
        }

        [HttpPut("{Id:Guid}/status")]
        public async Task<IActionResult> Status([FromRoute] Guid Id, [FromBody] ChangeStatusRequest request)
        {
            if (!await _service.Exists(Id))
            {
                return NotFound("Cook not exists");
            }

            await _service.Status(Id, request.Status);

            return Ok();
        }

        [HttpPut("{Id:Guid}/post")]
        public async Task<IActionResult> Post([FromRoute] Guid Id, [FromBody] ChangePostRequest request)
        {
            if (!await _service.Exists(Id))
            {
                return NotFound("Cook not exists");
            }

            await _service.Post(Id, request.PostId);

            return Ok();
        }
    }
}
