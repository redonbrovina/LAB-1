const BaseRepository = require("./BaseRepository");
const { Produkti, Kategoria, ProduktVariacioni } = require("../models");

class ProduktiRepository extends BaseRepository {
    constructor() {
        super(Produkti);
    }

    async getAllProduktet() {
        return await this.getAll({
            include: [
                {
                    model: Kategoria,
                    as: 'kategoria',
                    attributes: ['emri']
                },
                {
                    model: ProduktVariacioni,
                    as: 'variacionet',
                    attributes: ['produkt_variacioniID', 'cmimi']
                }
            ],
            order: [['emri', 'ASC']]
        });
    }

    async getProduktiById(produktiID) {
        return await this.getOneByField('produktiID', produktiID, {
            include: [
                {
                    model: Kategoria,
                    as: 'kategoria',
                    attributes: ['emri']
                },
                {
                    model: ProduktVariacioni,
                    as: 'variacionet',
                    attributes: ['produkt_variacioniID', 'cmimi']
                }
            ]
        });
    }

    async getProduktetByKategoria(kategoriaID) {
        return await this.getByField('kategoriaID', kategoriaID, {
            include: [
                {
                    model: Kategoria,
                    as: 'kategoria',
                    attributes: ['emri']
                },
                {
                    model: ProduktVariacioni,
                    as: 'variacionet',
                    attributes: ['produkt_variacioniID', 'cmimi']
                }
            ]
        });
    }

    async createProdukti(data) {
        console.log('Creating product with data:', data);
        const { cmimi, sasia_ne_stok, ...productData } = data;
        console.log('Product data:', productData);
        console.log('Price:', cmimi, 'Stock:', sasia_ne_stok);
        
        // Create the product first
        const produkti = await this.insert(productData);
        console.log('Product created:', produkti);
        
        // If price and stock are provided, create a product variation
        if (cmimi !== undefined && sasia_ne_stok !== undefined) {
            console.log('Creating product variation...');
            const ProduktVariacioniRepository = require("./ProduktVariacioniRepository");
            const produktVariacioniRepo = new ProduktVariacioniRepository();
            
            const variationData = {
                produktiID: produkti.produktiID,
                cmimi: cmimi
            };
            console.log('Variation data:', variationData);
            
            await produktVariacioniRepo.createVariacioni(variationData);
            console.log('Product variation created successfully');
        }
        
        // Return the product with its variations
        const result = await this.getProduktiById(produkti.produktiID);
        console.log('Final result:', result);
        return result;
    }

    async updateProdukti(produktiID, data) {
        // Update the product
        const result = await this.updateById(produktiID, data);
        
        // If price is provided, update the first variation's price
        if (data.cmimi !== undefined) {
            const ProduktVariacioniRepository = require("./ProduktVariacioniRepository");
            const produktVariacioniRepo = new ProduktVariacioniRepository();
            
            // Get all variations for this product
            const variations = await produktVariacioniRepo.getByField('produktiID', produktiID);
            
            if (variations && variations.length > 0) {
                // Update the first variation's price
                const firstVariation = variations[0];
                await produktVariacioniRepo.updateVariacioni(firstVariation.produkt_variacioniID, {
                    cmimi: data.cmimi
                });
            } else {
                // Create a new variation if none exists
                const variationData = {
                    produktiID: produktiID,
                    cmimi: data.cmimi
                };
                await produktVariacioniRepo.createVariacioni(variationData);
            }
        }
        
        // Return the updated product with its variations
        return await this.getProduktiById(produktiID);
    }

    async deleteProdukti(produktiID) {
        return await this.deleteById(produktiID);
    }

    // Search products by name or description
    async searchProduktet(query) {
        const { Op } = require('sequelize');
        return await this.getAll({
            where: {
                [Op.or]: [
                    { emri: { [Op.like]: `%${query}%` } },
                    { pershkrimi: { [Op.like]: `%${query}%` } }
                ]
            },
            include: [
                {
                    model: Kategoria,
                    as: 'kategoria',
                    attributes: ['emri']
                },
                {
                    model: ProduktVariacioni,
                    as: 'variacionet',
                    attributes: ['produkt_variacioniID', 'cmimi']
                }
            ],
            order: [['emri', 'ASC']]
        });
    }
}

module.exports = ProduktiRepository;
