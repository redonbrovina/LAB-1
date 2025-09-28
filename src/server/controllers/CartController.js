const CartService = require('../services/CartService');

class CartController {
    constructor() {
        this.service = new CartService();
    }

    async getAll(req, res) {
        try {
            console.log('CartController.getAll called');
            const carts = await this.service.getAllCarts();
            console.log('Carts retrieved:', carts);
            res.json(carts);
        } catch (err) {
            console.error('Error in CartController.getAll:', err);
            console.error('Error details:', err.message);
            console.error('Error stack:', err.stack);
            
            // Return empty array instead of error to prevent frontend crashes
            console.log('Returning empty array due to error');
            res.json([]);
        }
    }

    async getById(req, res) {
        try {
            const cart = await this.service.getCartById(req.params.id);
            if (!cart) return res.status(404).json({ message: 'Cart nuk u gjet' });
            res.json(cart);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getCartByKlientiID(req, res) {
        try {
            const carts = await this.service.getCartByKlientiID(req.params.klientiID);
            res.json(carts);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async create(req, res) {
        try {
            const newCart = await this.service.createCart(req.body);
            res.status(201).json(newCart);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async update(req, res) {
        try {
            const updated = await this.service.updateCart(req.params.id, req.body);
            if (!updated) return res.status(404).json({ message: 'Cart nuk u gjet' });
            res.json(updated);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async delete(req, res) {
        try {
            const deleted = await this.service.deleteCart(req.params.id);
            if (!deleted) return res.status(404).json({ message: 'Cart not found' });
            res.json({ message: 'Cart deleted successfully' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = CartController;
