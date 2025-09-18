const MenyraPagesesRepository = require('../repositories/MenyraPagesesRepository');

class MenyraPagesesService {
    constructor() {
        this.menyraPagesesRepo = new MenyraPagesesRepository();
    }

    async getAllMenyraPageses() {
        return await this.menyraPagesesRepo.getAll();
    }

    async getMenyraPagesesById(id) {
        return await this.menyraPagesesRepo.getById(id);
    }

    async createMenyraPageses(data) {
        // Map the frontend field names to database field names
        const dbData = {
            menyra_pageses: data.emri // Map 'emri' to 'menyra_pageses' field
        };
        return await this.menyraPagesesRepo.insert(dbData);
    }

    async updateMenyraPageses(id, data) {
        const dbData = {
            menyra_pageses: data.emri
        };
        return await this.menyraPagesesRepo.updateById(id, dbData);
    }

    async deleteMenyraPageses(id) {
        return await this.menyraPagesesRepo.deleteById(id);
    }
}

module.exports = MenyraPagesesService;
