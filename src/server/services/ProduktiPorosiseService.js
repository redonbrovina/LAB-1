const ProduktiPorosiseRepository = require('../repositories/ProduktiPorosiseRepository');

class ProduktiPorosiseService {
    constructor() {
        this.repo = new ProduktiPorosiseRepository();
    }

    getAll() {
        return this.repo.getAll();
    }

    getById(id) {
        return this.repo.getById(id);
    }

    create(data) {
        return this.repo.insert(data);
    }

    update(id, data) {
        return this.repo.updateById(id, data);
    }

    delete(id) {
        return this.repo.deleteById(id);
    }
}

module.exports = ProduktiPorosiseService;
