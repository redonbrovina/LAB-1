const BaseRepository = require("./BaseRepository");
const { MenyraPageses, Pagesa } = require("../models");

class MenyraPagesesRepository extends BaseRepository {
    constructor() {
        super(MenyraPageses);
    }

    async getAllMenyraPageses() {
        return await this.getAll({
            include: [
                {
                    model: Pagesa,
                    as: 'pagesat',
                    attributes: ['pagesaID', 'shuma_pageses']
                }
            ],
            order: [['menyra_pageses', 'ASC']]
        });
    }

    async getMenyraPagesesById(menyraPagesesID) {
        return await this.getOneByField('menyra_pagesesID', menyraPagesesID, {
            include: [
                {
                    model: Pagesa,
                    as: 'pagesat',
                    attributes: ['pagesaID', 'shuma_pageses']
                }
            ]
        });
    }

    async createMenyraPageses(data) {
        return await this.insert(data);
    }

    async updateMenyraPageses(menyraPagesesID, data) {
        return await this.updateById(menyraPagesesID, data);
    }

    async deleteMenyraPageses(menyraPagesesID) {
        return await this.deleteById(menyraPagesesID);
    }

    async deleteAssociatedPayments(menyraPagesesID) {
        // Delete all payments that reference this payment method
        const { Pagesa } = require("../models");
        return await Pagesa.destroy({
            where: { menyra_pagesesID: menyraPagesesID }
        });
    }

    async deleteAllMenyraPageses() {
        // Delete all payment methods
        try {
            const deletedCount = await this.model.destroy({
                where: {} // Delete all records
            });
            return deletedCount;
        } catch (error) {
            // If destroy fails, try truncate as fallback
            try {
                await this.model.destroy({
                    where: {},
                    truncate: true
                });
                return 1; // Truncate doesn't return count
            } catch (truncateError) {
                throw new Error(`Gabim gjatë fshirjes: ${error.message}`);
            }
        }
    }
}

module.exports = MenyraPagesesRepository;
