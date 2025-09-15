const CartService = require('../services/CartService');
const service = new CartService();

class CartController {
    async getAll(req, res) {
        const carts = await service.getAllCarts();
        res.json(carts);
    }

    async getById(req, res) {
        const cart = await service.getCartById(req.params.id);
        if (!cart) return res.status(404).json({ message: 'Cart nuk u gjet' });
        res.json(cart);
    }

    async create(req, res) {
        const newCart = await service.createCart(req.body);
        res.status(201).json(newCart);
    }

    async update(req, res) {
        const updated = await service.updateCart(req.params.id, req.body);
        if (!updated) return res.status(404).json({ message: 'Cart nuk u gjet' });
        res.json(updated);
    }

    async delete(req, res) {
        const deleted = await service.deleteCart(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Cart nuk u gjet' });
        res.json({ message: 'Cart u fshi me sukses' });
    }
}

module.exports = new CartController();
