const KlientiService = require('../services/KlientiService');
const ShtetiService = require('../services/ShtetiService');
const PasswordUtils = require('../utils/PasswordUtils');

class KlientiController {
    constructor() {
        this.klientiService = new KlientiService();
        this.shtetiService = new ShtetiService();
    }

    async getAllKlientet(req, res) {
        try {
            const klientet = await this.klientiService.getAllKlientet();
            return res.status(200).json(klientet);
        } catch (error) {
            res.status(500).json({
                message: 'Error fetching clients',
                error: error.message
            });
        }
    }

    async getKlientiById(req, res) {
        try {
            const klienti = await this.klientiService.getKlientiById(req.params.klientiID);
            return res.status(200).json(klienti);
        } catch (error) {
            if (error.message === "Klienti nuk u gjet") {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({
                    message: 'Error fetching client by ID',
                    error: error.message
                });
            }
        }
    }

    async getKlientiByEmri(req, res) {
        try {
            const klienti = await this.klientiService.getKlientiByEmri(req.params.emri_kompanise);
            return res.status(200).json(klienti);
        } catch (error) {
            res.status(500).json({
                message: 'Error fetching client by name',
                error: error.message
            });
        }
    }

    async createKlienti(req, res) {
        try {
            const { password, ...otherData } = req.body;
            
            // Validate password strength
            const passwordValidation = PasswordUtils.validatePasswordStrength(password);
            if (!passwordValidation.isValid) {
                return res.status(400).json({
                    message: passwordValidation.message
                });
            }
            
            // Hash the password
            const hashedPassword = await PasswordUtils.hashPassword(password);
            
            // Create client with hashed password
            const clientData = {
                ...otherData,
                password: hashedPassword
            };
            
            const newKlienti = await this.klientiService.createKlienti(clientData);
            return res.status(201).json(newKlienti);
        } catch (error) {
            res.status(500).json({
                message: 'Error creating client',
                error: error.message
            });
        }
    }

    async updateKlienti(req, res) {
        try {
            const updatedKlienti = await this.klientiService.updateKlienti(req.params.klientiID, req.body);
            console.log('Updated client');
            return res.status(200).json(updatedKlienti);
        } catch (error) {
            if (error.message === "Klienti nuk u gjet") {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({
                    message: 'Error updating client',
                    error: error.message
                });
            }
        }
    }

    async deleteKlienti(req, res) {
        try {
            await this.klientiService.deleteKlienti(req.params.klientiID);
            return res.status(204).send();
        } catch (error) {
            if (error.message === "Klienti nuk u gjet") {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({
                    message: 'Error deleting client',
                    error: error.message
                });
            }
        }
    }

    async getShtetiById(req, res) {
        try {
            const shteti = await this.shtetiService.getShtetiById(req.params.shtetiID);
            return res.status(200).json(shteti.emri_shtetit);
        } catch (error) {
            if (error.message === "Shteti nuk u gjet") {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({
                    message: 'Error fetching shteti by ID',
                    error: error.message
                });
            }
        }
    }
}

module.exports = KlientiController;