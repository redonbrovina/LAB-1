const CartRepository = require('../repositories/CartRepository');

class CartService {
    constructor() {
        this.cartRepo = new CartRepository();
    }

    async getAllCarts() {
        return await this.cartRepo.getAll({ orderBy: 'koha_krijimit DESC' });
    }

    async getCartById(id) {
        return await this.cartRepo.getById(id);
    }

    async createCart(data) {
        return await this.cartRepo.insert(data);
    }

    async updateCart(id, data) {
        return await this.cartRepo.updateById(id, data);
    }

    async deleteCart(id) {
        return await this.cartRepo.deleteById(id);
    }
}

module.exports = CartService;
