const BaseRepository = require('./BaseRepository');
const ProduktPorosise = require('../models/ProduktPorosise');

class ProduktiPorosiseRepository extends BaseRepository {
    constructor() {
        super(ProduktPorosise);
    }

    async getByPorosiaId(porosiaID) {
        return await this.getByField('porosiaID', porosiaID);
    }
}

module.exports = ProduktiPorosiseRepository;
