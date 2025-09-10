using Shneta.Domain.Entities;
using Shneta.Domain.Interfaces.Repositories;
using System.Collections.Generic;
using System.Linq;

namespace Shneta.Infrastructure.Repositories
{
    public class KlientiRepository : IKlientiRepository
    {
        private static readonly List<Klienti> _data = new List<Klienti>();
        private static int _nextId = 1;

        public KlientiRepository()
        {
            if (_data.Count == 0)
            {
                _data.Add(new Klienti { KlientiId = _nextId++, Adresa = "Rruga 1", Qyteti = "Tiranë", Email = "klienti1@email.com", Password = "123", KodiPostal = "1001" });
                _data.Add(new Klienti { KlientiId = _nextId++, Adresa = "Rruga 2", Qyteti = "Durrës", Email = "klienti2@email.com", Password = "123", KodiPostal = "2002" });
            }
        }

        public void Add(Klienti klienti)
        {
            klienti.KlientiId = _nextId++;
            _data.Add(klienti);
        }

        public void Delete(int id)
        {
            var k = _data.FirstOrDefault(x => x.KlientiId == id);
            if (k != null) _data.Remove(k);
        }

        public IEnumerable<Klienti> GetAll() => _data;

        public Klienti? GetById(int id) => _data.FirstOrDefault(x => x.KlientiId == id);

        public void Update(Klienti klienti)
        {
            var k = _data.FirstOrDefault(x => x.KlientiId == klienti.KlientiId);
            if (k != null)
            {
                k.Adresa = klienti.Adresa;
                k.Qyteti = klienti.Qyteti;
                k.KodiPostal = klienti.KodiPostal;
                k.Email = klienti.Email;
                k.Password = klienti.Password;
            }
        }
    }
}