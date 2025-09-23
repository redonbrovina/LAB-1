const PagesaService = require("../services/PagesaService");

const service = new PagesaService();

const PagesaController = {
  async create(req, res) {
    try {
      const { porosiaID, menyra_pagesesID, shuma_pageses, numri_llogarise, klientiID, adminID, pagesa_statusID } = req.body;
      
      // Validate required fields
      if (!menyra_pagesesID || !shuma_pageses) {
        return res.status(400).json({ 
          error: "menyra_pagesesID dhe shuma_pageses janë të detyrueshëm" 
        });
      }

      // Validate shuma_pageses is positive
      if (shuma_pageses <= 0) {
        return res.status(400).json({ 
          error: "Shuma e pageses duhet të jetë pozitive" 
        });
      }

      // B2B Logic: Either klientiID OR adminID, not both
      if (klientiID && adminID) {
        return res.status(400).json({ 
          error: "Pagesa mund të jetë ose për klient ose për admin, jo për të dy" 
        });
      }

      // Admin payments should not have porosiaID (they are for business expenses)
      if (adminID && porosiaID) {
        return res.status(400).json({ 
          error: "Pagesat e adminit nuk mund të lidhen me porosi klientësh" 
        });
      }

      const pagesa = await service.create({
        porosiaID,
        menyra_pagesesID,
        shuma_pageses,
        numri_llogarise,
        pagesa_statusID,
        klientiID,
        adminID
      });
      
      res.status(201).json(pagesa);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getAll(req, res) {
    try {
      const pagesat = await service.getAll();
      res.json(pagesat);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getPaginated(req, res) {
    try {
      const { page = 1, limit = 5 } = req.query;
      const result = await service.getPaginated({ 
        page: parseInt(page), 
        limit: parseInt(limit) 
      });
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const pagesa = await service.getById(id);
      res.json(pagesa);
    } catch (err) {
      if (err.message === "Pagesa nuk u gjet") {
        res.status(404).json({ error: err.message });
      } else {
        res.status(500).json({ error: err.message });
      }
    }
  },

  async getByPorosia(req, res) {
    try {
      const { porosiaID } = req.params;
      const pagesat = await service.getByPorosia(porosiaID);
      res.json(pagesat);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getByKlientiID(req, res) {
    try {
      const { klientiID } = req.params;
      const pagesat = await service.getByKlientiID(klientiID);
      res.json(pagesat);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getThisMonthByKlientiID(req, res) {
    try {
      const { klientiID } = req.params;
      const pagesat = await service.getThisMonthByKlientiID(klientiID);
      res.json(pagesat);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { shuma_pageses, numri_llogarise, klientiID } = req.body;
      
      // Validate shuma_pageses if provided
      if (shuma_pageses !== undefined && shuma_pageses <= 0) {
        return res.status(400).json({ 
          error: "Shuma e pageses duhet të jetë pozitive" 
        });
      }

      const pagesa = await service.update(id, {
        shuma_pageses,
        numri_llogarise,
        klientiID
      });
      
      res.json(pagesa);
    } catch (err) {
      if (err.message === "Pagesa nuk u gjet") {
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
      if (err.message === "Pagesa nuk u gjet") {
        res.status(404).json({ error: err.message });
      } else {
        res.status(500).json({ error: err.message });
      }
    }
  }
};

module.exports = PagesaController;   // ✅ make sure it’s this
