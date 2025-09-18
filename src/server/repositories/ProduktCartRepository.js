const BaseRepository = require('./BaseRepository');
const { ProduktCart, Cart, ProduktVariacioni } = require('../models');

class ProduktCartRepository extends BaseRepository {
    constructor() {
        super(ProduktCart);
    }

    async getAllCartItems() {
        return await this.getAll({
            include: [
                {
                    model: Cart,
                    as: 'cart',
                    attributes: ['cartID', 'koha_krijimit', 'cmimi_total']
                },
                {
                    model: ProduktVariacioni,
                    as: 'produktVariacioni',
                    attributes: ['produkt_variacioniID', 'cmimi', 'sasia_ne_stok']
                }
            ],
            order: [['produkt_cartID', 'ASC']]
        });
    }

    async getCartItemById(cartItemID) {
        return await this.getOneByField('produkt_cartID', cartItemID, {
            include: [
                {
                    model: Cart,
                    as: 'cart',
                    attributes: ['cartID', 'koha_krijimit', 'cmimi_total']
                },
                {
                    model: ProduktVariacioni,
                    as: 'produktVariacioni',
                    attributes: ['produkt_variacioniID', 'cmimi', 'sasia_ne_stok']
                }
            ]
        });
    }

    async getByCartId(cartID) {
        return await this.getByField('cartID', cartID, {
            include: [
                {
                    model: ProduktVariacioni,
                    as: 'produktVariacioni',
                    attributes: ['produkt_variacioniID', 'cmimi', 'sasia_ne_stok']
                }
            ]
        });
    }

    async createCartItem(data) {
        return await this.insert(data);
    }

    async updateCartItem(cartItemID, data) {
        return await this.updateById(cartItemID, data);
    }

    async deleteCartItem(cartItemID) {
        return await this.deleteById(cartItemID);
    }
}

module.exports = ProduktCartRepository;
