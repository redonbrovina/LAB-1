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
            if (!porosia) return res.status(404).json({ message: 'Porosia nuk u gjet' });
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

    async create(req, res) {
        try {
            console.log('📦 PorosiaController.create called with data:', req.body);
            const newPorosia = await this.service.createPorosia(req.body);
            console.log('📦 New order created:', newPorosia);
            
            res.status(201).json(newPorosia);
        } catch (err) {
            console.error('❌ Error in PorosiaController.create:', err);
            res.status(500).json({ error: err.message });
        }
    }

    async update(req, res) {
        try {
            const updated = await this.service.updatePorosia(req.params.id, req.body);
            if (!updated) return res.status(404).json({ message: 'Porosia nuk u gjet' });
            res.json(updated);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async delete(req, res) {
        try {
            const deleted = await this.service.deletePorosia(req.params.id);
            if (!deleted) return res.status(404).json({ message: 'Porosia nuk u gjet' });
            res.json({ message: 'Porosia u fshi me sukses' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = PorosiaController;
