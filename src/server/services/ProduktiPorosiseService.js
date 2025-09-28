const ProduktiPorosiseRepository = require('../repositories/ProduktiPorosiseRepository');
const ProduktiService = require('./ProduktiService');
const { ProduktVariacioni } = require('../models');

class ProduktiPorosiseService {
    constructor() {
        this.repo = new ProduktiPorosiseRepository();
        this.produktiService = new ProduktiService();
    }

    async getAll() {
        return await this.repo.getAll();
    }

    async getById(id) {
        const item = await this.repo.getById(id);
        if (!item) throw new Error("Product not found");
        return item;
    }

    async create(data) {
        // Get the product variation to find the main product ID
        const variation = await ProduktVariacioni.findByPk(data.produkt_variacioniID);
        if (!variation) {
            throw new Error('Product variation not found');
        }

        // Reduce stock for the main product
        await this.produktiService.reduceStock(variation.produktiID, data.sasia);

        // Create the order item
        return await this.repo.insert(data);
    }

    async update(id, data) {
        const oldItem = await this.getById(id);
        
        // If quantity is being updated, adjust stock accordingly
        if (data.sasia !== undefined && data.sasia !== oldItem.sasia) {
            const variation = await ProduktVariacioni.findByPk(oldItem.produkt_variacioniID);
            if (variation) {
                const quantityDifference = data.sasia - oldItem.sasia;
                
                if (quantityDifference > 0) {
                    // Increasing quantity - reduce stock
                    await this.produktiService.reduceStock(variation.produktiID, quantityDifference);
                } else if (quantityDifference < 0) {
                    // Decreasing quantity - increase stock
                    await this.produktiService.increaseStock(variation.produktiID, Math.abs(quantityDifference));
                }
            }
        }
        
        return await this.repo.updateById(id, data);
    }

    async delete(id) {
        const item = await this.getById(id);
        
        // Get the product variation to find the main product ID
        const variation = await ProduktVariacioni.findByPk(item.produkt_variacioniID);
        if (variation) {
            // Restore stock for the main product
            await this.produktiService.increaseStock(variation.produktiID, item.sasia);
        }
        
        return await this.repo.deleteById(id);
    }
}

module.exports = ProduktiPorosiseService;
