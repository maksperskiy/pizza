using Microsoft.AspNetCore.Mvc;
using pizza.Data.Models;
using pizza.Web.Services.Cook;
using System;
using System.Threading.Tasks;

namespace pizza.Web.Controllers.Cook
{
    [ApiController]
    [Route("api/[controller]")]
    public class PostController : ControllerBase
    {
        private readonly IPostService _service;

        public PostController(IPostService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] CreatePostRequest request)
        {
            if (await _service.Exists(value: request.Value))
            {
                return Conflict("Post does already exist");
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
                return NotFound("Post does not exist");
            }

            if (await _service.CookExists(Id))
            {
                return BadRequest("Cook with this post already exists");
            }

            await _service.Remove(Id);

            return Ok();
        }
    }
}
