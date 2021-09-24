﻿using Microsoft.AspNetCore.Http;
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
    public class PizzasController : ControllerBase
    {
        private readonly IPizzaService _service;

        public PizzasController(IPizzaService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromForm] CreatePizzaRequest request, IFormFile image)
        {
            /*if (await _service.Exists(value: request.Value, name: request.Name))
            {
                return Conflict("Size does already exist");
            }*/

            var result = await _service.Create(request, image);

            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var result = await _service.Get();
            return Ok(result);
        }
    }
}