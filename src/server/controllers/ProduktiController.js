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

    async getPaginated(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 12;
            const result = await this.produktiService.getPaginated(page, limit);
            res.json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getById(req, res) {
        try {
            const data = await this.produktiService.getById(req.params.id);
            res.json(data);
        } catch (err) {
            if (err.message === "Product not found") {
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
            if (err.message === "Product not found") {
                res.status(404).json({ message: err.message });
            } else {
                res.status(500).json({ error: err.message });
            }
        }
    }

    async delete(req, res) {
        try {
            await this.produktiService.delete(req.params.id);
            res.json({ message: "Product deleted successfully" });
        } catch (err) {
            if (err.message === "Product not found") {
                res.status(404).json({ message: err.message });
            } else {
                res.status(500).json({ error: err.message });
            }
        }
    }

    async search(req, res) {
        try {
            const { q } = req.query;
            if (!q) {
                return res.status(400).json({ error: "Search query is required" });
            }
            const data = await this.produktiService.search(q);
            res.json(data);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }


    async increaseStock(req, res) {
        try {
            const { quantity } = req.body;
            if (!quantity || quantity <= 0) {
                return res.status(400).json({ error: "Valid quantity is required" });
            }
            const data = await this.produktiService.increaseStock(req.params.id, quantity);
            res.json(data);
        } catch (err) {
            if (err.message === "Product not found") {
                res.status(404).json({ message: err.message });
            } else {
                res.status(500).json({ error: err.message });
            }
        }
    }

    async reduceStock(req, res) {
        try {
            const { quantity } = req.body;
            if (!quantity || quantity <= 0) {
                return res.status(400).json({ error: "Valid quantity is required" });
            }
            const data = await this.produktiService.reduceStock(req.params.id, quantity);
            res.json(data);
        } catch (err) {
            if (err.message === "Product not found") {
                res.status(404).json({ message: err.message });
            } else if (err.message === "Insufficient stock quantity") {
                res.status(400).json({ message: err.message });
            } else {
                res.status(500).json({ error: err.message });
            }
        }
    }
}

module.exports = ProduktiController;
