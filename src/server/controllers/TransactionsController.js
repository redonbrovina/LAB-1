const PagesaService = require('../services/PagesaService');
const MenyraPagesesService = require('../services/MenyraPagesesService');

class TransactionsController {
    constructor() {
        this.pagesaService = new PagesaService();
        this.menyraPagesesService = new MenyraPagesesService();
    }

    // Pagesa
    async getPagesa(req, res) {
        try {
            const pagesat = await this.pagesaService.getAll();
            res.json(pagesat);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createPagesa(req, res) {
        try {
            const { orderId, methodId, amount, accountNumber } = req.body;
            const newPagesa = await this.pagesaService.create({
                porosiaID: orderId,
                menyra_pagesesID: methodId,
                shuma_pageses: amount,
                numri_llogarise: accountNumber
            });
            res.status(201).json(newPagesa);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Menyra Pageses
    async getMenyra(req, res) {
        try {
            const menyrat = await this.menyraPagesesService.getAll();
            res.json(menyrat);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createMenyra(req, res) {
        try {
            const { name } = req.body;
            const newMenyra = await this.menyraPagesesService.create({
                menyra_pageses: name
            });
            res.status(201).json(newMenyra);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

}

module.exports = TransactionsController;
