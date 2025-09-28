const PorosiaService = require('../services/PorosiaService');
const KlientiService = require('../services/KlientiService');
const EmailService = require('../services/EmailService');
const ProduktiService = require('../services/ProduktiService');

class PorosiaController {
    constructor() {
        this.service = new PorosiaService();
        this.klientiService = new KlientiService();
        this.emailService = new EmailService();
        this.produktiService = new ProduktiService();
    }

    async getAll(req, res) {
        try {
            const porosite = await this.service.getAllPorosite();
            res.json(porosite);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getById(req, res) {
        try {
            const porosia = await this.service.getPorosiaById(req.params.id);
            if (!porosia) return res.status(404).json({ message: 'Order not found' });
            res.json(porosia);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getPorositeByKlientiID(req, res) {
        try {
            const porosite = await this.service.getPorositeByKlientiID(req.params.klientiID);
            res.json(porosite);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getOrderItems(req, res) {
        try {
            const { id } = req.params;
            const orderItems = await this.service.getOrderItemsWithProductInfo(id);
            res.json(orderItems);
        } catch (err) {
            console.error('❌ Error in PorosiaController.getOrderItems:', err);
            res.status(500).json({ error: err.message });
        }
    }

    async updateOrderStatus(req, res) {
        try {
            const { id } = req.params;
            const { porosia_statusID } = req.body;

            if (!porosia_statusID) {
                return res.status(400).json({ error: 'Order status is required' });
            }

            const validStatuses = [1, 2, 3];
            if (!validStatuses.includes(parseInt(porosia_statusID))) {
                return res.status(400).json({ error: 'Invalid order status' });
            }

            const updated = await this.service.updatePorosia(id, { porosia_statusID });
            if (!updated) return res.status(404).json({ message: 'Order not found' });
            
            res.json({
                message: 'Order status updated successfully',
                data: updated
            });
        } catch (err) {
            console.error('❌ Error in PorosiaController.updateOrderStatus:', err);
            res.status(500).json({ error: err.message });
        }
    }

    async getOrdersByStatus(req, res) {
        try {
            const { statusID } = req.params;
            const orders = await this.service.getOrdersByStatus(statusID);
            res.json(orders);
        } catch (err) {
            console.error('❌ Error in PorosiaController.getOrdersByStatus:', err);
            res.status(500).json({ error: err.message });
        }
    }

    async getOrdersByDateRange(req, res) {
        try {
            const { startDate, endDate } = req.query;
            if (!startDate || !endDate) {
                return res.status(400).json({ error: 'Start date and end date are required' });
            }
            const orders = await this.service.getOrdersByDateRange(startDate, endDate);
            res.json(orders);
        } catch (err) {
            console.error('❌ Error in PorosiaController.getOrdersByDateRange:', err);
            res.status(500).json({ error: err.message });
        }
    }

    async getOrderStatistics(req, res) {
        try {
            const statistics = await this.service.getOrderStatistics();
            res.json(statistics);
        } catch (err) {
            console.error('❌ Error in PorosiaController.getOrderStatistics:', err);
            res.status(500).json({ error: err.message });
        }
    }

    async create(req, res) {
        try {
            console.log('📦 PorosiaController.create called with data:', req.body);
            
            // Validate required fields
            const { klientiID, cmimi_total } = req.body;
            if (!klientiID) {
                return res.status(400).json({ error: 'KlientiID is required' });
            }
            if (!cmimi_total || cmimi_total <= 0) {
                return res.status(400).json({ error: 'Valid total amount is required' });
            }

            // Set default values
            const orderData = {
                ...req.body,
                porosia_statusID: req.body.porosia_statusID || 1, // Default to "In Process"
                pagesa_statusID: req.body.pagesa_statusID || 1, // Default to "Pending"
                koha_krijimit: new Date()
            };

            const newPorosia = await this.service.createPorosia(orderData);
            console.log('📦 New order created:', newPorosia);
            
            res.status(201).json({
                message: 'Order created successfully',
                data: newPorosia
            });
        } catch (err) {
            console.error('❌ Error in PorosiaController.create:', err);
            res.status(500).json({ error: err.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const updateData = req.body;

            console.log('📝 PorosiaController.update called with ID:', id);
            console.log('📝 Update data:', updateData);

            // Validate required fields
            if (!id) {
                return res.status(400).json({ error: 'Order ID is required' });
            }

            // Validate order exists
            const existingOrder = await this.service.getPorosiaById(id);
            if (!existingOrder) {
                console.log('❌ Order not found with ID:', id);
                return res.status(404).json({ message: 'Order not found' });
            }

            console.log('✅ Order found:', existingOrder);

            // Validate status updates
            if (updateData.porosia_statusID !== undefined) {
                const validStatuses = [1, 2, 3]; // In Process, Completed, Cancelled
                if (!validStatuses.includes(parseInt(updateData.porosia_statusID))) {
                    return res.status(400).json({ error: 'Invalid order status' });
                }
            }

            if (updateData.pagesa_statusID !== undefined) {
                const validPaymentStatuses = [1, 2, 3]; // Pending, Paid, Failed
                if (!validPaymentStatuses.includes(parseInt(updateData.pagesa_statusID))) {
                    return res.status(400).json({ error: 'Invalid payment status' });
                }
            }

            // Validate numeric fields
            if (updateData.cmimi_total !== undefined) {
                const total = parseFloat(updateData.cmimi_total);
                if (isNaN(total) || total < 0) {
                    return res.status(400).json({ error: 'Invalid total amount' });
                }
                updateData.cmimi_total = total;
            }

            if (updateData.klientiID !== undefined) {
                const clientId = parseInt(updateData.klientiID);
                if (isNaN(clientId) || clientId <= 0) {
                    return res.status(400).json({ error: 'Invalid client ID' });
                }
                updateData.klientiID = clientId;
            }

            console.log('📝 Final update data:', updateData);

            const updated = await this.service.updatePorosia(id, updateData);
            if (!updated) {
                console.log('❌ Update returned null/undefined');
                return res.status(404).json({ message: 'Order not found' });
            }
            
            console.log('✅ Order updated successfully:', updated);
            res.json({
                message: 'Order updated successfully',
                data: updated
            });
        } catch (err) {
            console.error('❌ Error in PorosiaController.update:', err);
            console.error('❌ Error stack:', err.stack);
            res.status(500).json({ error: err.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;

            console.log('🗑️ PorosiaController.delete called with ID:', id);

            // Validate ID
            if (!id) {
                return res.status(400).json({ error: 'Order ID is required' });
            }

            // Validate order exists
            const existingOrder = await this.service.getPorosiaById(id);
            if (!existingOrder) {
                console.log('❌ Order not found with ID:', id);
                return res.status(404).json({ message: 'Order not found' });
            }

            console.log('✅ Order found:', existingOrder);

            // Check if order can be deleted (allow deletion of all orders)
            // Note: In a real application, you might want to restrict deletion of completed orders
            // For now, we'll allow deletion of all orders
            console.log('✅ Order can be deleted, proceeding with deletion...');

            console.log('🗑️ Proceeding with deletion...');
            const deleted = await this.service.deletePorosia(id);
            if (!deleted) {
                console.log('❌ Delete operation returned false');
                return res.status(404).json({ message: 'Order not found' });
            }
            
            console.log('✅ Order deleted successfully');
            res.json({ 
                message: 'Order deleted successfully',
                deletedOrderId: id
            });
        } catch (err) {
            console.error('❌ Error in PorosiaController.delete:', err);
            console.error('❌ Error stack:', err.stack);
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = PorosiaController;
