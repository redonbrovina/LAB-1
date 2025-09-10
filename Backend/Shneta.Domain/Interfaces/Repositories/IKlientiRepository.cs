using Shneta.Domain.Entities;
using System.Collections.Generic;

namespace Shneta.Domain.Interfaces.Repositories
{
    public interface IKlientiRepository
    {
        Klienti? GetById(int id);

        IEnumerable<Klienti> GetAll();

        void Add(Klienti klienti);

        void Update(Klienti klienti);
        
        void Delete(int id);
    }
}