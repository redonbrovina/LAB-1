const express = require('express');
const router = express.Router();
const CartController = require('../controllers/CartController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

const controller = new CartController();

//router.use(authenticateToken);

router.get('/', controller.getAll.bind(controller));
router.get('/test', (req, res) => {
    res.json({ message: 'Cart API is working', timestamp: new Date().toISOString() });
});
router.get('/klienti/:klientiID', controller.getCartByKlientiID.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

module.exports = router;
