const {KlientiService} = require('../services');
const klientiService = new KlientiService();

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

module.exports = {
    getAllKlientet,
    getKlientiById,
    createKlienti,
    updateKlienti,
    deleteKlienti
};