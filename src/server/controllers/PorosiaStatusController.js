const BaseRepository = require('../repositories/PorosiaStatusRepository');
const repo = new BaseRepository();

class PorosiaStatusController {
    getAll(req, res) { repo.getAll().then(r => res.json(r)); }
    getById(req, res) { repo.getById(req.params.id).then(r => res.json(r)); }
    create(req, res) { repo.insert(req.body).then(r => res.json(r)); }
    update(req, res) { repo.updateById(req.params.id, req.body).then(r => res.json(r)); }
    delete(req, res) { repo.deleteById(req.params.id).then(r => res.json({ success: r })); }
}

module.exports = PorosiaStatusController;
