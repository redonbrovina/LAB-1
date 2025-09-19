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
                    attributes: ['produkt_variacioniID', 'cmimi', 'sasia_ne_stok']
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
                    attributes: ['produkt_variacioniID', 'cmimi', 'sasia_ne_stok']
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
                    attributes: ['produkt_variacioniID', 'cmimi', 'sasia_ne_stok']
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
                cmimi: cmimi,
                sasia_ne_stok: sasia_ne_stok
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
        return await this.updateById(produktiID, data);
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
                    attributes: ['produkt_variacioniID', 'cmimi', 'sasia_ne_stok']
                }
            ],
            order: [['emri', 'ASC']]
        });
    }
}

module.exports = ProduktiRepository;
