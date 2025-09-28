const BaseRepository = require('./BaseRepository');
const ProduktPorosise = require('../models/ProduktPorosise');
const { Produkti } = require('../models');

class ProduktiPorosiseRepository extends BaseRepository {
    constructor() {
        super(ProduktPorosise);
    }

    async getByPorosiaId(porosiaID) {
        return await this.getByField('porosiaID', porosiaID);
    }

    async getOrderItemsWithProductInfo(porosiaID) {
        return await this.getByField('porosiaID', porosiaID, {
            include: [
                {
                    model: Produkti,
                    as: 'produkti',
                    attributes: ['produktiID', 'emri', 'sasia_ne_stok', 'cmimi', 'imazhi']
                }
            ]
        });
    }

    async deleteByField(field, value) {
        try {
            console.log(`ProduktiPorosiseRepository.deleteByField called with ${field} = ${value}`);
            const deletedRows = await this.model.destroy({ 
                where: { [field]: value } 
            });
            console.log(`Deleted ${deletedRows} order items`);
            return deletedRows;
        } catch (error) {
            console.error('Error in ProduktiPorosiseRepository.deleteByField:', error);
            throw error;
        }
    }
}

module.exports = ProduktiPorosiseRepository;
