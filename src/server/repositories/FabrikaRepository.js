const BaseRepository = require('./BaseRepository');
const {Fabrika} = require('../models/');

class FabrikaRepository extends BaseRepository {
    constructor() {
        super(Fabrika);
    }

    async getAllFabrikat() {
        return await this.getAll();
    }

    async create(data) {
        return await this.insert(data);
    }

    async update(id, data) {
        return await this.updateById(id, data);
    }

    async delete(id) {
        return await this.deleteById(id);
    }
}

module.exports = FabrikaRepository