const BaseRepository = require('./BaseRepository');

class ProduktiCartRepository extends BaseRepository {
    constructor() {
        super('produkti_cart', 'produkti_cartID');
    }

    async getByCartId(cartID) {
        return await this.getByField('cartID', cartID);
    }
}

module.exports = ProduktiCartRepository;
