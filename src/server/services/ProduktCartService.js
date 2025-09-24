const ProduktCartRepository = require('../repositories/ProduktCartRepository');

class ProduktCartService {
    constructor() {
        this.produktCartRepository = new ProduktCartRepository();
    }

    async getAll() {
        console.log('ProduktCartService.getAll called');
        try {
            const result = await this.produktCartRepository.getAllCartItems();
            console.log('ProduktCartService.getAll result:', result);
            return result;
        } catch (error) {
            console.error('Error in ProduktCartService.getAll:', error);
            throw error;
        }
    }

    async getById(cartItemID) {
        const cartItem = await this.produktCartRepository.getCartItemById(cartItemID);
        if (!cartItem) throw new Error("Produkti nuk u gjet");
        return cartItem;
    }

    async getByCartId(cartID) {
        return await this.produktCartRepository.getByCartId(cartID);
    }

    async getCartItemsWithProductInfo(cartID) {
        return await this.produktCartRepository.getCartItemsWithProductInfo(cartID);
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
        console.log('ProduktCartService.insert called with data:', data);
        try {
            const result = await this.produktCartRepository.createCartItem(data);
            console.log('ProduktCartService.insert result:', result);
            return result;
        } catch (error) {
            console.error('Error in ProduktCartService.insert:', error);
            throw error;
        }
    }
}

module.exports = ProduktCartService;
