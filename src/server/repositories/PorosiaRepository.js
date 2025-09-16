const BaseRepository = require('./BaseRepository'); 

class PorosiaRepository extends BaseRepository {
    constructor() {
        super('porosia', 'porosiaID'); 
    }

    async getPorositeByKlientiID(klientiID) {
        return await this.getByField('klientiID', klientiID);
    }
}

module.exports = PorosiaRepository;
