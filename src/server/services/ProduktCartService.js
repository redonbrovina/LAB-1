const ProduktCartRepository = require('../repositories/ProduktCartRepository');

class ProduktCartService {
    constructor() {
        this.produktCartRepository = new ProduktCartRepository();
    }

    async getAll() {
        return await this.produktCartRepository.getAllCartItems();
    }

    async getById(cartItemID) {
        const cartItem = await this.produktCartRepository.getCartItemById(cartItemID);
        if (!cartItem) throw new Error("Produkti nuk u gjet");
        return cartItem;
    }

    async getByCartId(cartID) {
        return await this.produktCartRepository.getByCartId(cartID);
    }

    async create(data) {
        return await this.produktCartRepository.createCartItem(data);
    }

    async updateById(cartItemID, data) {
        await this.getById(cartItemID);
        return await this.produktCartRepository.updateCartItem(cartItemID, data);
    }

    async deleteById(cartItemID) {
        await this.getById(cartItemID);
        return await this.produktCartRepository.deleteCartItem(cartItemID);
    }

    async insert(data) {
        return await this.produktCartRepository.createCartItem(data);
    }
}

module.exports = ProduktCartService;
