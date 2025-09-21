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
        if (!menyraPageses) throw new Error("Menyra e pageses nuk u gjet");
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
            throw new Error("Nuk mund të fshihet mënyra e pagesës sepse është në përdorim nga pagesa ekzistuese. Së pari fshini pagesat e lidhura.");
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
            throw new Error(`Gabim gjatë fshirjes së të gjitha mënyrave të pagesës: ${error.message}`);
        }
    }
}

module.exports = MenyraPagesesService;
