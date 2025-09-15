const ProduktiPorosiseService = require('../services/ProduktiPorosiseService');
const service = new ProduktiPorosiseService();

class ProduktiPorosiseController {
    getAll(req, res) { service.getAll().then(r => res.json(r)); }
    getById(req, res) { service.getById(req.params.id).then(r => res.json(r)); }
    create(req, res) { service.create(req.body).then(r => res.json(r)); }
    update(req, res) { service.update(req.params.id, req.body).then(r => res.json(r)); }
    delete(req, res) { service.delete(req.params.id).then(r => res.json({ success: r })); }
}

module.exports = ProduktiPorosiseController;
