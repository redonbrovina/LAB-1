const CartService = require('../services/CartService');

class CartController {
    constructor() {
        this.service = new CartService();
    }

    async getAll(req, res) {
        try {
            const carts = await this.service.getAllCarts();
            res.json(carts);
        } catch (err) {
            res.status(500).json({ error: err.message });
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
            if (!deleted) return res.status(404).json({ message: 'Cart nuk u gjet' });
            res.json({ message: 'Cart u fshi me sukses' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = CartController;
