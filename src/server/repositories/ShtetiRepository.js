const BaseRepository = require("./BaseRepository");

class ShtetiRepository extends BaseRepository {
    constructor() {
        super('shteti', 'shtetiID');
    }

    async getAllShtetet() {
        try{
            const countries = await this.getAll({ orderBy: 'emri_shtetit' });
            return countries.map(c => ({
                ShtetiID: c.shtetiID,
                Emri_shtetit: c.emri_shtetit
            }));
            
        } catch (error) {
            console.log('Database Error when fetching countries', error)
            throw error
        }
    }
}

module.exports = ShtetiRepository;