const PagesaService = require('../services/PagesaService');
const MenyraPagesesService = require('../services/MenyraPagesesService');
const LevizjaNeStokService = require('../services/LevizjaNeStokService');

class TransactionsController {
    constructor() {
        this.pagesaService = new PagesaService();
        this.menyraPagesesService = new MenyraPagesesService();
        this.levizjaNeStokService = new LevizjaNeStokService();
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

    // Levizja ne stok
    async getLevizjet(req, res) {
        try {
            const levizjet = await this.levizjaNeStokService.getAll();
            res.json(levizjet);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createLevizje(req, res) {
        try {
            const { produktVariacioniId, lloj, sasia, porosiaId, adminId } = req.body;
            const newLevizje = await this.levizjaNeStokService.create({
                produkt_variacioniID: produktVariacioniId,
                lloj: lloj,
                sasia: sasia,
                porosiaID: porosiaId,
                adminID: adminId
            });
            res.status(201).json(newLevizje);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = TransactionsController;
