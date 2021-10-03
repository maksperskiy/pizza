using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using pizza.Data.Models;
using pizza.Web.Services;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace pizza.Web.Controllers.Pizza
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryService _service;

        public CategoriesController(ICategoryService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] CreateNameRequest request)
        {
            if (await _service.Exists(value:request.Value))
            {
                return Conflict("Category does already exist");
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
                return NotFound("Category does not exist");
            }

            if (await _service.PizzaExists(Id))
            {
                return BadRequest("Pizza with this category already exists");
            }

            await _service.Remove(Id);

            return Ok();
        }

        [HttpGet("{Id:Guid}/hide")]
        public async Task<IActionResult> Hide([FromRoute] Guid Id)
        {
            if (!await _service.Exists(Id))
            {
                return NotFound("Category does not exist");
            }

            await _service.Hide(Id);

            return Ok();
        }
    }
}
