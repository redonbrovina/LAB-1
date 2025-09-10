using Shneta.Domain.Entities;
using System.Collections.Generic;

namespace Shneta.Application.Interfaces.Services
{
    public interface IKlientiService
    {
        Klienti? GetById(int id);

        IEnumerable<Klienti> GetAll();

        void Add(Klienti klienti);

        void Update(Klienti klienti);
        
        void Delete(int id);
    }
}