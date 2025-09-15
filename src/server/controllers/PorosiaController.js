const PorosiaService = require('../services/PorosiaService');
const service = new PorosiaService();

class PorosiaController {
    async getAll(req, res) {
        const porosite = await service.getAllPorosite();
        res.json(porosite);
    }

    async getById(req, res) {
        const porosia = await service.getPorosiaById(req.params.id);
        if (!porosia) return res.status(404).json({ message: 'Porosia nuk u gjet' });
        res.json(porosia);
    }

    async create(req, res) {
        const newPorosia = await service.createPorosia(req.body);
        res.status(201).json(newPorosia);
    }

    async update(req, res) {
        const updated = await service.updatePorosia(req.params.id, req.body);
        if (!updated) return res.status(404).json({ message: 'Porosia nuk u gjet' });
        res.json(updated);
    }

    async delete(req, res) {
        const deleted = await service.deletePorosia(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Porosia nuk u gjet' });
        res.json({ message: 'Porosia u fshi me sukses' });
    }
}

module.exports = new PorosiaController();
