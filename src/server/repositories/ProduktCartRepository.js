const BaseRepository = require('./BaseRepository');
const { ProduktCart, Cart, ProduktVariacioni } = require('../models');

class ProduktCartRepository extends BaseRepository {
    constructor() {
        super(ProduktCart);
    }

    async getAllCartItems() {
        console.log('🔍 ProduktCartRepository.getAllCartItems called');
        try {
            // Start with basic query without includes
            console.log('Testing basic cart items query...');
            const result = await this.getAll({
                order: [['produkti_cartID', 'ASC']]
            });
            console.log('ProduktCartRepository.getAllCartItems result:', result);
            return result;
        } catch (error) {
            console.error('Error in ProduktCartRepository.getAllCartItems:', error);
            console.error('Error details:', error.message);
            console.error('Error stack:', error.stack);
            throw error;
        }
    }

    async getCartItemById(cartItemID) {
        return await this.getOneByField('produkti_cartID', cartItemID, {
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
        console.log('ProduktCartRepository.createCartItem called with data:', data);
        try {
            // Validate required fields
            if (!data.cartID) {
                throw new Error('cartID is required');
            }
            if (!data.produkt_variacioniID) {
                throw new Error('produkt_variacioniID is required');
            }
            if (!data.sasia) {
                throw new Error('sasia is required');
            }
            if (!data.cmimi) {
                throw new Error('cmimi is required');
            }
            
            console.log('All required fields present, creating cart item...');
            const result = await this.insert(data);
            console.log('ProduktCartRepository.createCartItem result:', result);
            return result;
        } catch (error) {
            console.error('Error in ProduktCartRepository.createCartItem:', error);
            console.error('Error details:', error.message);
            console.error('Error stack:', error.stack);
            throw error;
        }
    }

    async updateCartItem(cartItemID, data) {
        return await this.updateById(cartItemID, data);
    }

    async deleteCartItem(cartItemID) {
        return await this.deleteById(cartItemID);
    }
}

module.exports = ProduktCartRepository;
