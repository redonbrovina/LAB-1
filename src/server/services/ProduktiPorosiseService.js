const ProduktiPorosiseRepository = require('../repositories/ProduktiPorosiseRepository');
const ProduktiService = require('./ProduktiService');

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
        // Reduce stock for the product directly
        await this.produktiService.reduceStock(data.produktiID, data.sasia);

        // Create the order item
        return await this.repo.insert(data);
    }

    async update(id, data) {
        const oldItem = await this.getById(id);
        
        // If quantity is being updated, adjust stock accordingly
        if (data.sasia !== undefined && data.sasia !== oldItem.sasia) {
            const quantityDifference = data.sasia - oldItem.sasia;
            
            if (quantityDifference > 0) {
                // Increasing quantity - reduce stock
                await this.produktiService.reduceStock(oldItem.produktiID, quantityDifference);
            } else if (quantityDifference < 0) {
                // Decreasing quantity - increase stock
                await this.produktiService.increaseStock(oldItem.produktiID, Math.abs(quantityDifference));
            }
        }
        
        return await this.repo.updateById(id, data);
    }

    async delete(id) {
        const item = await this.getById(id);
        
        // Restore stock for the product
        await this.produktiService.increaseStock(item.produktiID, item.sasia);
        
        return await this.repo.deleteById(id);
    }
}

module.exports = ProduktiPorosiseService;
