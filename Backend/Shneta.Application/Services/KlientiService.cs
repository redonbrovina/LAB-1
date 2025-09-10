using Shneta.Application.Interfaces.Services;
using Shneta.Domain.Entities;
using Shneta.Domain.Interfaces.Repositories;
using System.Collections.Generic;

namespace Shneta.Application.Services
{
    public class KlientiService : IKlientiService
    {
        private readonly IKlientiRepository _klientiRepository;

        public KlientiService(IKlientiRepository klientiRepository)
        {
            _klientiRepository = klientiRepository;
        }

        public IEnumerable<Klienti> GetAll()
        {
            return _klientiRepository.GetAll();
        }

        public Klienti? GetById(int id)
        {
            return _klientiRepository.GetById(id);
        }

        public void Add(Klienti klienti)
        {
            _klientiRepository.Add(klienti);
        }

        public void Update(Klienti klienti)
        {
            _klientiRepository.Update(klienti);
        }

        public void Delete(int id)
        {
            _klientiRepository.Delete(id);
        }
    }
}