const PagesaModel = require('../models/Pagesa');
const MenyraPagesesModel = require('../models/MenyraPageses');
const LevizjaNeStokModel = require('../models/Levizja_ne_stok');

// Pagesa
const getPagesa = async (_req, res) => {
  const rows = await PagesaModel.getAll();
  res.json(rows);
};
const createPagesa = async (req, res) => {
  const { orderId, methodId, amount, accountNumber } = req.body;
  const row = await PagesaModel.create(orderId, methodId, amount, accountNumber);
  res.status(201).json(row);
};

// Menyra Pageses
const getMenyra = async (_req, res) => {
  const rows = await MenyraPagesesModel.getAll();
  res.json(rows);
};
const createMenyra = async (req, res) => {
  const { name } = req.body;
  const row = await MenyraPagesesModel.create(name);
  res.status(201).json(row);
};

// Levizja ne stok
const getLevizjet = async (_req, res) => {
  const rows = await LevizjaNeStokModel.getAll();
  res.json(rows);
};
const createLevizje = async (req, res) => {
  const { produktVariacioniId, lloj, sasia, porosiaId, adminId } = req.body;
  const row = await LevizjaNeStokModel.create(produktVariacioniId, lloj, sasia, porosiaId, adminId);
  res.status(201).json(row);
};

module.exports = {
  getPagesa,
  createPagesa,
  getMenyra,
  createMenyra,
  getLevizjet,
  createLevizje,
};
