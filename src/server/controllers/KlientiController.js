const {KlientiService} = require('../services');
const {ShtetiService} = require('../services');
const klientiService = new KlientiService();
const shtetiService = new ShtetiService();

const getAllKlientet = async (req, res) => {
    try {
        const klientet = await klientiService.getAllKlientet();
        return res.status(200).json(klientet);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching clients',
            error: error.message
        });
    }
}

const getKlientiById = async (req, res) => {
    try{
        const klienti = await klientiService.getKlientiById(req.params.klientiID);
        return res.status(200).json(klienti);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching client by ID',
            error: error.message
        });
    }
}

const getKlientiByEmri = async (req, res) => {
    try {
        const klienti = await klientiService.getKlientiByEmri(req.params.emri_kompanise);
        return res.status(200).json(klienti);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching client by name',
            error: error.message
        });
    }
}

const createKlienti = async (req, res) => {
    try {
        const newKlienti = await klientiService.createKlienti(req.body);
        return res.status(201).json(newKlienti);
    } catch (error) {
        res.status(500).json({
            message: 'Error creating client',
            error: error.message
        });
    }
}

const updateKlienti = async (req, res) => {
    try {
        const updatedKlienti = await klientiService.updateKlienti(req.params.klientiID, req.body);
        console.log('Updated client');
        return res.status(200).json(updatedKlienti);
    } catch (error) {
        res.status(500).json({
            message: 'Error updating client',
            error: error.message
        });
    }
}

const deleteKlienti = async (req, res) => {
    try {
        await klientiService.deleteKlienti(req.params.klientiID);
        return res.status(204).send();
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting client',
            error: error.message
        });
    }
}

const getShtetiById = async (req, res) => {
    try {
        const shteti = await shtetiService.getShtetiById(req.params.shtetiID);
        const emri = shteti[0].emri_shtetit;
        return res.status(200).json(emri);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching shteti by ID',
            error: error.message
        });
    }
}

module.exports = {
    getAllKlientet,
    getKlientiById,
    getKlientiByEmri,
    createKlienti,
    updateKlienti,
    deleteKlienti,
    getShtetiById
};