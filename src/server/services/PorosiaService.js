const PorosiaRepository = require('../repositories/PorosiaRepository');
const ProduktiPorosiseRepository = require('../repositories/ProduktiPorosiseRepository');

class PorosiaService {
    constructor() {
        this.porosiaRepo = new PorosiaRepository();
        this.produktiPorosiseRepo = new ProduktiPorosiseRepository();
    }

    async getAllPorosite() {
        return await this.porosiaRepo.getAllPorosite();
    }

    async getPorosiaById(id) {
        return await this.porosiaRepo.getPorosiaById(id);
    }

    async getPorositeByKlientiID(klientiID) {
        return await this.porosiaRepo.getPorositeByKlientiID(klientiID);
    }

    async createPorosia(data) {
        try {
            console.log('PorosiaService.createPorosia called with:', data);
            const result = await this.porosiaRepo.createPorosia(data);
            console.log('PorosiaService.createPorosia result:', result);
            return result;
        } catch (error) {
            console.error('Error in PorosiaService.createPorosia:', error);
            throw new Error(`Failed to create order: ${error.message}`);
        }
    }

    async updatePorosia(id, data) {
        try {
            console.log(`PorosiaService.updatePorosia called for ID ${id} with:`, data);
            
            // Validate ID
            if (!id) {
                throw new Error('Order ID is required');
            }
            
            // Check if order exists first
            const existingOrder = await this.porosiaRepo.getPorosiaById(id);
            if (!existingOrder) {
                console.log(`Order with ID ${id} not found`);
                return null;
            }
            
            console.log('Existing order found:', existingOrder);
            
            const result = await this.porosiaRepo.updatePorosia(id, data);
            console.log('PorosiaService.updatePorosia result:', result);
            return result;
        } catch (error) {
            console.error('Error in PorosiaService.updatePorosia:', error);
            console.error('Error stack:', error.stack);
            throw new Error(`Failed to update order: ${error.message}`);
        }
    }

    async deletePorosia(id) {
        try {
            console.log(`PorosiaService.deletePorosia called for ID ${id}`);
            
            // Validate ID
            if (!id) {
                throw new Error('Order ID is required');
            }
            
            // Check if order exists first
            const existingOrder = await this.porosiaRepo.getPorosiaById(id);
            if (!existingOrder) {
                console.log(`Order with ID ${id} not found`);
                return false;
            }
            
            console.log('Existing order found:', existingOrder);
            
            // Delete the order (related items will be deleted automatically due to CASCADE constraint)
            console.log('Deleting order (related items will be cascade deleted)...');
            const result = await this.porosiaRepo.deletePorosia(id);
            console.log('PorosiaService.deletePorosia result:', result);
            return result;
        } catch (error) {
            console.error('Error in PorosiaService.deletePorosia:', error);
            console.error('Error stack:', error.stack);
            throw new Error(`Failed to delete order: ${error.message}`);
        }
    }

    async getOrderItems(porosiaID) {
        return await this.produktiPorosiseRepo.getByPorosiaId(porosiaID);
    }

    async getOrderItemsWithProductInfo(porosiaID) {
        return await this.produktiPorosiseRepo.getOrderItemsWithProductInfo(porosiaID);
    }

    async getOrdersByStatus(statusID) {
        try {
            return await this.porosiaRepo.getByField('porosia_statusID', statusID, {
                include: [
                    {
                        model: require('../models').PorosiaStatus,
                        as: 'porosiaStatus',
                        attributes: ['statusi']
                    },
                    {
                        model: require('../models').Klienti,
                        as: 'klienti',
                        attributes: ['emri_kompanise', 'email']
                    }
                ],
                order: [['koha_krijimit', 'DESC']]
            });
        } catch (error) {
            console.error('Error in PorosiaService.getOrdersByStatus:', error);
            throw new Error(`Failed to get orders by status: ${error.message}`);
        }
    }

    async getOrdersByDateRange(startDate, endDate) {
        try {
            return await this.porosiaRepo.getAll({
                where: {
                    koha_krijimit: {
                        [require('sequelize').Op.between]: [startDate, endDate]
                    }
                },
                include: [
                    {
                        model: require('../models').PorosiaStatus,
                        as: 'porosiaStatus',
                        attributes: ['statusi']
                    },
                    {
                        model: require('../models').Klienti,
                        as: 'klienti',
                        attributes: ['emri_kompanise', 'email']
                    }
                ],
                order: [['koha_krijimit', 'DESC']]
            });
        } catch (error) {
            console.error('Error in PorosiaService.getOrdersByDateRange:', error);
            throw new Error(`Failed to get orders by date range: ${error.message}`);
        }
    }

    async getOrderStatistics() {
        try {
            const totalOrders = await this.porosiaRepo.count();
            const completedOrders = await this.porosiaRepo.count({ porosia_statusID: 2 });
            const pendingOrders = await this.porosiaRepo.count({ porosia_statusID: 1 });
            const cancelledOrders = await this.porosiaRepo.count({ porosia_statusID: 3 });

            return {
                total: totalOrders,
                completed: completedOrders,
                pending: pendingOrders,
                cancelled: cancelledOrders,
                completionRate: totalOrders > 0 ? (completedOrders / totalOrders * 100).toFixed(2) : 0
            };
        } catch (error) {
            console.error('Error in PorosiaService.getOrderStatistics:', error);
            throw new Error(`Failed to get order statistics: ${error.message}`);
        }
    }
}

module.exports = PorosiaService;
