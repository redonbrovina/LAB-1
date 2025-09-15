const BaseRepository = require("./BaseRepository");

class ShtetiRepository extends BaseRepository {
    constructor() {
        super('shteti', 'shtetiID');
    }

    async getAllShtetet() {
        const countries = await this.getAll({ orderBy: 'emri_shtetit' });
        return countries.map(c => ({
            ShtetiID: c.shtetiID,
            Emri_shtetit: c.emri_shtetit
        }));
    }
}

module.exports = ShtetiRepository;