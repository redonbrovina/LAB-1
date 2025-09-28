const MenyraPagesesRepository = require("../repositories/MenyraPagesesRepository");

class MenyraPagesesService {
    constructor() {
        this.menyraPagesesRepo = new MenyraPagesesRepository();
    }

    async getAll() {
        return await this.menyraPagesesRepo.getAllMenyraPageses();
    }

    async getById(id) {
        const menyraPageses = await this.menyraPagesesRepo.getMenyraPagesesById(id);
        if (!menyraPageses) throw new Error("Payment method not found");
        return menyraPageses;
    }

    async create(data) {
        return await this.menyraPagesesRepo.createMenyraPageses(data);
    }

    async update(id, data) {
        await this.getById(id);
        return await this.menyraPagesesRepo.updateMenyraPageses(id, data);
    }

    async delete(id) {
        await this.getById(id);
        
        // Check if payment method is in use
        const isInUse = await this.menyraPagesesRepo.isPaymentMethodInUse(id);
        if (isInUse) {
            throw new Error("Cannot delete payment method because it is in use by existing payments. Please delete associated payments first.");
        }
        
        // Delete the payment method
        return await this.menyraPagesesRepo.deleteMenyraPageses(id);
    }

    async deleteAll() {
        try {
            // Get all payment methods first
            const allMenyraPageses = await this.getAll();
            
            if (!allMenyraPageses || allMenyraPageses.length === 0) {
                return 0; // Nothing to delete
            }
            
            // Delete all associated payments first
            for (const menyraPageses of allMenyraPageses) {
                await this.menyraPagesesRepo.deleteAssociatedPayments(menyraPageses.menyra_pagesesID);
            }
            
            // Then delete all payment methods
            const deletedCount = await this.menyraPagesesRepo.deleteAllMenyraPageses();
            return deletedCount;
        } catch (error) {
            throw new Error(`Error during deletion of all payment methods: ${error.message}`);
        }
    }
}

module.exports = MenyraPagesesService;
