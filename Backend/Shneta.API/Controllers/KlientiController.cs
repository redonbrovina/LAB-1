using Microsoft.AspNetCore.Mvc;
using Shneta.Application.Interfaces.Services;
using Shneta.Domain.DTOs;
using Shneta.Domain.Entities; 

namespace Shneta.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class KlientiController : ControllerBase
    {
        private readonly IKlientiService _klientiService;

        public KlientiController(IKlientiService klientiService)
        {
            _klientiService = klientiService;
        }

        [HttpGet("{id}")]
        public ActionResult<Klienti> GetById(int id)
        {
            var klienti = _klientiService.GetById(id);
            if (klienti == null) return NotFound();
            return Ok(klienti);
        }

        [HttpGet]
        public ActionResult<IEnumerable<Klienti>> GetAll()
        {
            var klientet = _klientiService.GetAll();
            return Ok(klientet);
        }

        [HttpPost]
        public ActionResult Add([FromBody] KlientiDto dto)
        {
        
            var klienti = new Klienti
            {
                Adresa = dto.Adresa,
                Qyteti = dto.Qyteti,
                KodiPostal = dto.KodiPostal,
                Email = dto.Email,
                Password = dto.Password
            };

            try
            {
                _klientiService.Add(klienti);
                return Ok(new { Message = "Klienti u shtua me sukses!", Id = klienti.KlientiId });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        
        [HttpPut("{id}")]
        public ActionResult Update(int id, [FromBody] KlientiDto dto)
        {
            var klienti = _klientiService.GetById(id);
            if (klienti == null) return NotFound();

            klienti.Adresa = dto.Adresa;
            klienti.Qyteti = dto.Qyteti;
            klienti.KodiPostal = dto.KodiPostal;
            klienti.Email = dto.Email;
            klienti.Password = dto.Password;

            _klientiService.Update(klienti);
            return Ok("Klienti u përditësua me sukses!");
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            _klientiService.Delete(id);
            return Ok("Klienti u fshi me sukses!");
        }
    }
}