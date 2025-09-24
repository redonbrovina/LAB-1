const ProduktiRepository = require("../repositories/ProduktiRepository");

class ProduktiService {
    constructor() {
        this.produktiRepo = new ProduktiRepository();
    }

    async getAll() {
        return await this.produktiRepo.getAllProduktet();
    }

    async getById(id) {
        const produkti = await this.produktiRepo.getProduktiById(id);
        if (!produkti) throw new Error("Produkti nuk u gjet");
        return produkti;
    }

    async getByKategoria(kategoriaID) {
        return await this.produktiRepo.getProduktetByKategoria(kategoriaID);
    }

    async create(data) {
        return await this.produktiRepo.createProdukti(data);
    }

    async update(id, data) {
        await this.getById(id);
        return await this.produktiRepo.updateProdukti(id, data);
    }

    async delete(id) {
        await this.getById(id);
        return await this.produktiRepo.deleteProdukti(id);
    }

    // Search products by name or description
    async search(query) {
        return await this.produktiRepo.searchProduktet(query);
    }

    // Get paginated products
    async getPaginated(page = 1, limit = 12) {
        return await this.produktiRepo.getPaginatedProduktet(page, limit);
    }

    // Get products with category details
    async getAllWithCategory() {
        return await this.produktiRepo.getAllProduktet();
    }

    // Get product with full details including variations
    async getProductWithVariations(productId) {
        return await this.produktiRepo.getProduktiById(productId);
    }

    // Reduce stock for a product
    async reduceStock(productId, quantity) {

        try {
            console.log(`📦 Reducing stock for product ${productId} by ${quantity}`);
            
            // Get current product
            const product = await this.getById(productId);
            const currentStock = parseInt(product.sasia_ne_stok) || 0;
            
            if (currentStock < quantity) {
                throw new Error(`Insufficient stock. Available: ${currentStock}, Requested: ${quantity}`);
            }
            
            const newStock = currentStock - quantity;
            console.log(`📦 Stock update: ${currentStock} - ${quantity} = ${newStock}`);
            
            // Update stock
            const updatedProduct = await this.update(productId, {
                sasia_ne_stok: newStock.toString()
            });
            
            console.log(`✅ Stock reduced successfully for product ${productId}: ${currentStock} → ${newStock}`);
            return updatedProduct;
        } catch (error) {
            console.error(`❌ Error reducing stock for product ${productId}:`, error);
            throw error;
        }
    }

    // Increase stock for a product
    async increaseStock(productId, quantity) {
        try {
            console.log(`📦 Increasing stock for product ${productId} by ${quantity}`);
            
            // Get current product
            const product = await this.getById(productId);
            const currentStock = parseInt(product.sasia_ne_stok) || 0;
            const newStock = currentStock + quantity;
            
            console.log(`📦 Stock update: ${currentStock} + ${quantity} = ${newStock}`);
            
            // Update stock
            const updatedProduct = await this.update(productId, {
                sasia_ne_stok: newStock.toString()
            });
            
            console.log(`✅ Stock increased successfully for product ${productId}: ${currentStock} → ${newStock}`);
            return updatedProduct;
        } catch (error) {
            console.error(`❌ Error increasing stock for product ${productId}:`, error);
            throw error;
        }
        const product = await this.getById(productId);
        
        if (product.sasia_ne_stok < quantity) {
            throw new Error(`Stoku i mbetur (${product.sasia_ne_stok}) është më pak se sasia e kërkuar (${quantity})`);
        }
        
        const newStock = product.sasia_ne_stok - quantity;
        return await this.produktiRepo.updateProdukti(productId, { sasia_ne_stok: newStock });
    }

    // Increase stock for a product (useful for order cancellation)
    async increaseStock(productId, quantity) {
        const product = await this.getById(productId);
        const newStock = product.sasia_ne_stok + quantity;
        return await this.produktiRepo.updateProdukti(productId, { sasia_ne_stok: newStock });
    }
}

module.exports = ProduktiService;
