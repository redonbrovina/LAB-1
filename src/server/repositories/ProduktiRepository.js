const BaseRepository = require("./BaseRepository");
const { Produkti, Kategoria } = require("../models");

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
            ]
        });
    }

    async createProdukti(data) {
        console.log('Creating product with data:', data);
        
        // Create the product
        const produkti = await this.insert(data);
        console.log('Product created:', produkti);
        
        // Return the product
        const result = await this.getProduktiById(produkti.produktiID);
        console.log('Final result:', result);
        return result;
    }

    async updateProdukti(produktiID, data) {
        // Update the product
        const result = await this.updateById(produktiID, data);
        
        // Return the updated product with its form
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
            ],
            order: [['emri', 'ASC']]
        });
    }

    // Get paginated products
    async getPaginatedProduktet(page = 1, limit = 12) {
        const offset = (page - 1) * limit;
        
        const { count, rows } = await this.model.findAndCountAll({
            include: [
                {
                    model: Kategoria,
                    as: 'kategoria',
                    attributes: ['emri']
                },
            ],
            order: [['emri', 'ASC']],
            limit: parseInt(limit),
            offset: parseInt(offset)
        });

        const totalPages = Math.ceil(count / limit);

        return {
            data: rows,
            pagination: {
                currentPage: parseInt(page),
                totalPages: totalPages,
                totalItems: count,
                itemsPerPage: parseInt(limit),
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            }
        };
    }
}

module.exports = ProduktiRepository;
