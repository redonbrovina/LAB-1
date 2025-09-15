const BaseRepository = require('./BaseRepository');

class PorosiaStatusRepository extends BaseRepository {
    constructor() {
        super('porosia_status', 'porosia_statusID');
    }
}

module.exports = PorosiaStatusRepository;
