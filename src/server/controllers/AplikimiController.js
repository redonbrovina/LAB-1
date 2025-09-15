const { AplikimiService } = require('../services');
const aplikimiService = new AplikimiService();

const getAllAplikimet = async (req, res) => {
    try {
        const aplikimet = await aplikimiService.getAllAplikimet();
        return res.status(200).json(aplikimet);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching applications',
            error: error.message
        });
    } 
}

const getAplikimiById = async (req, res) => {
    try{
        const aplikimi = await aplikimiService.getAplikimiById(req.params.aplikimiID);
        return res.status(200).json(aplikimi);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching application by ID',
            error: error.message
        });
    }
}

const getAplikimiByAplikimiStatusID = async (req, res) => {
    try{
        const aplikimet = await aplikimiService.getAplikimiByAplikimiStatusID(req.params.aplikimiStatusID);
        return res.status(200).json(aplikimet);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching applications by status ID',   
            error: error.message
        });
    }
}

const createAplikimi = async (req, res) => {
    try {
        const newAplikimi = await aplikimiService.createAplikimi(req.body);
        return res.status(201).json(newAplikimi);
    } catch (error) {
        res.status(500).json({
            message: 'Error creating application',
            error: error.message
        });
    }
}

const updateAplikimi = async (req, res) => {
    try {
        const updatedAplikimi = await aplikimiService.updateAplikimi(req.params.aplikimiID, req.body);
        return res.status(200).json(updatedAplikimi);
    } catch (error) {
        res.status(500).json({
            message: 'Error updating application',
            error: error.message
        });
    }
}

const deleteAplikimi = async (req, res) => {
    try {
        await aplikimiService.deleteAplikimi(req.params.aplikimiID);
        return res.status(204).send();
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting application',
            error: error.message
        });
    }
}

module.exports = {
    getAllAplikimet,
    getAplikimiById,
    getAplikimiByAplikimiStatusID,
    createAplikimi,
    updateAplikimi,
    deleteAplikimi
}