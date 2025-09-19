const MenyraPagesesService = require("../services/MenyraPagesesService");

const service = new MenyraPagesesService();

const MenyraPagesesController = {
  async create(req, res) {
    try {
      const { menyra_pageses } = req.body;
      
      // Validate required fields
      if (!menyra_pageses || menyra_pageses.trim() === '') {
        return res.status(400).json({ 
          error: "Menyra e pageses është e detyrueshme" 
        });
      }

      const newMenyraPageses = await service.create({
        menyra_pageses: menyra_pageses.trim()
      });
      
      res.status(201).json(newMenyraPageses);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getAll(req, res) {
    try {
      const menyraPageses = await service.getAll();
      res.json(menyraPageses);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const menyraPageses = await service.getById(id);
      res.json(menyraPageses);
    } catch (err) {
      if (err.message === "Menyra e pageses nuk u gjet") {
        res.status(404).json({ error: err.message });
      } else {
        res.status(500).json({ error: err.message });
      }
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { menyra_pageses } = req.body;
      
      // Validate menyra_pageses if provided
      if (menyra_pageses !== undefined && menyra_pageses.trim() === '') {
        return res.status(400).json({ 
          error: "Menyra e pageses nuk mund të jetë e zbrazët" 
        });
      }

      const updatedMenyraPageses = await service.update(id, {
        menyra_pageses: menyra_pageses ? menyra_pageses.trim() : undefined
      });
      
      res.json(updatedMenyraPageses);
    } catch (err) {
      if (err.message === "Menyra e pageses nuk u gjet") {
        res.status(404).json({ error: err.message });
      } else {
        res.status(500).json({ error: err.message });
      }
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(204).send();
    } catch (err) {
      if (err.message === "Menyra e pageses nuk u gjet") {
        res.status(404).json({ error: err.message });
      } else {
        res.status(500).json({ error: err.message });
      }
    }
  },

  async deleteAll(req, res) {
    try {
      const deletedCount = await service.deleteAll();
      res.status(200).json({ 
        message: "Të gjitha mënyrat e pagesës u fshinë me sukses",
        deletedCount: deletedCount
      });
    } catch (err) {
      res.status(500).json({ 
        error: "Gabim gjatë fshirjes së të gjitha mënyrave të pagesës: " + err.message 
      });
    }
  }
};

module.exports = MenyraPagesesController;
