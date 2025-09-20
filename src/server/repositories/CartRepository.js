const BaseRepository = require('./BaseRepository');
const { Cart, Klienti, ProduktCart, ProduktVariacioni } = require("../models");

class CartRepository extends BaseRepository {
    constructor() {
        super(Cart);
    }

    async getAllCarts() {
        console.log('🔍 CartRepository.getAllCarts called');
        try {
            // First try without includes to see if basic query works
            console.log('Testing basic cart query...');
            const basicResult = await this.getAll();
            console.log('Basic cart query result:', basicResult);
            
            // If basic query works, try with includes
            console.log('Testing cart query with includes...');
            const result = await this.getAll({
                include: [
                    {
                        model: Klienti,
                        as: 'klienti',
                        attributes: ['emri_kompanise', 'email']
                    },
                    {
                        model: ProduktCart,
                        as: 'produktet',
                        include: [{
                            model: ProduktVariacioni,
                            as: 'produktVariacioni',
                            attributes: ['cmimi']
                        }]
                    }
                ],
                order: [['koha_krijimit', 'DESC']]
            });
            console.log('CartRepository.getAllCarts result:', result);
            return result;
        } catch (error) {
            console.error('Error in CartRepository.getAllCarts:', error);
            console.error('Error details:', error.message);
            console.error('Error stack:', error.stack);
            throw error;
        }
    }

    async getCartById(cartID) {
        return await this.getOneByField('cartID', cartID, {
            include: [
                {
                    model: Klienti,
                    as: 'klienti',
                    attributes: ['emri_kompanise', 'email']
                },
                {
                    model: ProduktCart,
                    as: 'produktet',
                    include: [{
                        model: ProduktVariacioni,
                        as: 'produktVariacioni',
                        attributes: ['cmimi', 'sasia_ne_stok']
                    }]
                }
            ]
        });
    }

    async getCartByKlientiID(klientiID) {
        return await this.getByField('klientiID', klientiID, {
            include: [
                {
                    model: ProduktCart,
                    as: 'produktet',
                    include: [{
                        model: ProduktVariacioni,
                        as: 'produktVariacioni',
                        attributes: ['cmimi', 'sasia_ne_stok']
                    }]
                }
            ],
            order: [['koha_krijimit', 'DESC']]
        });
    }

    async createCart(data) {
        return await this.insert(data);
    }

    async updateCart(cartID, data) {
        return await this.updateById(cartID, data);
    }

    async deleteCart(cartID) {
        return await this.deleteById(cartID);
    }
}

module.exports = CartRepository;
