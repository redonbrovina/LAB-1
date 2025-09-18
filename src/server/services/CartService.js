const CartRepository = require('../repositories/CartRepository');

class CartService {
    constructor() {
        this.cartRepo = new CartRepository();
    }

    async getAllCarts() {
        console.log('CartService.getAllCarts called');
        const result = await this.cartRepo.getAllCarts();
        console.log('CartService.getAllCarts result:', result);
        return result;
    }

    async getCartById(id) {
        return await this.cartRepo.getCartById(id);
    }

    async getCartByKlientiID(klientiID) {
        return await this.cartRepo.getCartByKlientiID(klientiID);
    }

    async createCart(data) {
        return await this.cartRepo.createCart(data);
    }

    async updateCart(id, data) {
        return await this.cartRepo.updateCart(id, data);
    }

    async deleteCart(id) {
        return await this.cartRepo.deleteCart(id);
    }
}

module.exports = CartService;
