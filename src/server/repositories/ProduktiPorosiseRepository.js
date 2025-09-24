const BaseRepository = require('./BaseRepository');
const ProduktPorosise = require('../models/ProduktPorosise');
const { ProduktVariacioni, Produkti } = require('../models');

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
                    model: ProduktVariacioni,
                    as: 'produktVariacioni',
                    attributes: ['produkt_variacioniID', 'cmimi', 'produktiID'],
                    include: [
                        {
                            model: Produkti,
                            as: 'produkti',
                            attributes: ['produktiID', 'emri', 'sasia_ne_stok']
                        }
                    ]
                }
            ]
        });
    }
}

module.exports = ProduktiPorosiseRepository;
