const BaseRepository = require('./BaseRepository');

class CartRepository extends BaseRepository {
    constructor() {
        super('cart', 'cartID');
    }

    async getCartByKlientiID(klientiID) {
        return await this.getByField('klientiID', klientiID);
    }
}

module.exports = CartRepository;
