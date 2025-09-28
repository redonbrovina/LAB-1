const BaseRepository = require('./BaseRepository');
const PagesaStatus = require('../models/PagesaStatus');

class PagesaStatusRepository extends BaseRepository {
    constructor() {
        super(PagesaStatus);
    }
}

module.exports = PagesaStatusRepository;
