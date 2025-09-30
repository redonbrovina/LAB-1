const BaseRepository = require('./BaseRepository');
const {Punetori, Fabrika} = require('../models/')

class PunetoriRepository extends BaseRepository {
    constructor() {
        super(Punetori);
    }

    async getAllPunetoret() {
        return await this.getAll({
            include: [
                {
                    model: Fabrika,
                    as: 'Fabrika',
                    attributes: ['EmriFabrikes']
                }
            ]
        })
    }

    async create(data) {
        return await this.insert(data)
    }

    async update(id, data){
        return await this.updateById(id, data)
    }

    async delete(id){
        return await this.deleteById(id)
    }
}

module.exports = PunetoriRepository
