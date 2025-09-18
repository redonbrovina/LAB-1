const ProduktiService = require("../services/ProduktiService");

class ProduktiController {
    constructor() {
        this.produktiService = new ProduktiService();
    }

    async getAll(req, res) {
        try {
            const data = await this.produktiService.getAll();
            res.json(data);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getById(req, res) {
        try {
            const data = await this.produktiService.getById(req.params.id);
            res.json(data);
        } catch (err) {
            if (err.message === "Produkti nuk u gjet") {
                res.status(404).json({ message: err.message });
            } else {
                res.status(500).json({ error: err.message });
            }
        }
    }

    async getByKategoria(req, res) {
        try {
            const data = await this.produktiService.getByKategoria(req.params.kategoriaID);
            res.json(data);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async create(req, res) {
        try {
            const data = await this.produktiService.create(req.body);
            res.status(201).json(data);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async update(req, res) {
        try {
            const data = await this.produktiService.update(req.params.id, req.body);
            res.json(data);
        } catch (err) {
            if (err.message === "Produkti nuk u gjet") {
                res.status(404).json({ message: err.message });
            } else {
                res.status(500).json({ error: err.message });
            }
        }
    }

    async delete(req, res) {
        try {
            await this.produktiService.delete(req.params.id);
            res.json({ message: "Produkti u fshi me sukses" });
        } catch (err) {
            if (err.message === "Produkti nuk u gjet") {
                res.status(404).json({ message: err.message });
            } else {
                res.status(500).json({ error: err.message });
            }
        }
    }
}

module.exports = ProduktiController;
