const jwt = require('jsonwebtoken');
const {AdminService} = require('../services');
const adminService = new AdminService();

const adminLogin = async (req, res) => {
    try {
        const {email, password, kodi_personal} = req.body;
        const admin = await adminService.getAdminByEmail(email);
        
        if(admin[0] && admin[0].pass === password && admin[0].kodi_personal == kodi_personal) {
            const token = jwt.sign(
                {id: admin[0].adminID, role: 'admin'},
                process.env.JWT_SECRET,
                {expiresIn: '1h'}
            );
            return res.status(200).json({token, role: 'admin'});
        } else {
            return res.status(401).json({message: 'Invalid email, password, or personal code'});
        }
    } catch (error) {
        console.error('Error in adminLogin:', error);
        return res.status(500).json({message: 'Admin login failed'});
    }
};

const getAllAdminet = async (req, res) => {
    try {
        const adminet = await adminService.getAllAdminet();
        return res.status(200).json(adminet);
    }
    catch (error) {
        res.status(500).json({
            message: 'Error fetching admins',
            error: error.message
        });
    }
}
const getAdminById = async (req, res) => {
    try {
        const admin = await adminService.getAdminById(req.params.adminID);
        return res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching admin by ID',
            error: error.message
        });
    }
}

const updateAdmin = async (req, res) => {
    try {
        const updatedAdmin = await adminService.updateAdmin(req.params.adminID, req.body);
        return res.status(200).json(updatedAdmin);
    } catch (error) {
        res.status(500).json({
            message: 'Error updating admin',
            error: error.message
        });
    }
}

const deleteAdmin = async (req, res) => {
    try {
        await adminService.deleteAdmin(req.params.adminID);
        return res.status(204).send();
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting admin',
            error: error.message
        });
    } 
}

module.exports = {
    adminLogin,
    getAllAdminet,
    getAdminById,
    updateAdmin,
    deleteAdmin
};