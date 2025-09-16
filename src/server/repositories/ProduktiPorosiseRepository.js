const BaseRepository = require('./BaseRepository');

class ProduktiPorosiseRepository extends BaseRepository {
    constructor() {
        super('produkti_porosise', 'produkti_porosiseID');
    }

    async getByPorosiaId(porosiaID) {
        return await this.getByField('porosiaID', porosiaID);
    }
}

module.exports = ProduktiPorosiseRepository;
