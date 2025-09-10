using Shneta.Domain.Interfaces;

namespace Shneta.Domain.Entities
{
    public class Klienti : BaseEntity
    {
        public string Adresa { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;
        
        public string Qyteti { get; set; } = string.Empty;
        
        public string KodiPostal { get; set; } = string.Empty;
        
        public string Email { get; set; } = string.Empty;
        

        public int KlientiId 
        { 
            get { return Id; }
             
            set { Id = value; } 
        }
    }
}