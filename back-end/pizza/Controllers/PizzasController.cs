using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using pizza.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pizza.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PizzasContoller : ControllerBase
    {
        private readonly IPizzaService _service;

        public PizzasContoller(IPizzaService service)
        {
            _service = service;
        }

        [HttpPost("name")]
        public async Task<IActionResult> AddName([FromBody] string name)
        {
            if (await _service.NameExists(name))
            {
                return Conflict("name does already exist");
            }

            var result = await _service.CreateName(name);

            return Ok(result);
        }

        [HttpGet("name")]
        public async Task<IActionResult> GetNames()
        {
            var result = await _service.GetNames();

            return Ok(result);
        }

        [HttpDelete("name")]
        public async Task<IActionResult> RemoveName([FromBody] Guid Id)
        {
            if (!await _service.NameExists(Id))
            {
                return NotFound("name does not exist");
            }

            await _service.RemoveName(Id);

            return Ok();
        }

        [HttpPost("type")]
        public async Task<IActionResult> AddType([FromBody] string type)
        {
            if (await _service.TypeExists(type))
            {
                return Conflict("type does already exist");
            }

            var result = _service.CreateType(type);

            return Ok(result);
        }
/*
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            })
            .ToArray();
        }*/
    }
}
