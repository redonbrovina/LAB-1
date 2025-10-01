const AplikimiService = require('../services/AplikimiService');
const KlientiService = require('../services/KlientiService');
const PasswordUtils = require('../utils/PasswordUtils');
const EmailService = require('../services/EmailService');

class AplikimiController {
    constructor() {
        this.aplikimiService = new AplikimiService();
        this.klientiService = new KlientiService();
        this.emailService = new EmailService();
    }

    async getAllAplikimet(req, res) {
        try {
            const aplikimet = await this.aplikimiService.getAllAplikimet();
            return res.status(200).json(aplikimet);
        } catch (error) {
            res.status(500).json({
                message: 'Error fetching applications',
                error: error.message
            });
        }
    }

    async getAplikimiById(req, res) {
        try {
            const aplikimi = await this.aplikimiService.getAplikimiById(req.params.aplikimiID);
            return res.status(200).json(aplikimi);
        } catch (error) {
            if (error.message === "Aplikimi nuk u gjet") {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({
                    message: 'Error fetching application by ID',
                    error: error.message
                });
            }
        }
    }

    async getAplikimiByAplikimiStatusID(req, res) {
        try {
            const aplikimet = await this.aplikimiService.getAplikimiByAplikimiStatusID(req.params.aplikimiStatusID);
            return res.status(200).json(aplikimet);
        } catch (error) {
            res.status(500).json({
                message: 'Error fetching applications by status ID',
                error: error.message
            });
        }
    }

    async createAplikimi(req, res) {
        try {
            const { email, password, ...otherData } = req.body;
            const existingClient = await this.klientiService.getKlientiByEmail(email);
            
            if (existingClient) {
                return res.status(400).json({ message: 'Email already in use' });
            }

            const passwordValidation = PasswordUtils.validatePasswordStrength(password);
            if (!passwordValidation.isValid) {
                return res.status(400).json({
                    message: passwordValidation.message
                });
            }

            // Store password in plain text for applications (will be hashed when creating client)
            const newAplikimi = await this.aplikimiService.createAplikimi({
                ...otherData,
                email: email,
                password: password,
                aplikimi_statusID: 1 // Default to "pending" status
            });
            return res.status(201).json(newAplikimi);
        } catch (error) {
            res.status(500).json({
                message: 'Error creating application',
                error: error.message
            });
        }
    }

    async updateAplikimi(req, res) {
        try {
            const updatedAplikimi = await this.aplikimiService.updateAplikimi(req.params.aplikimiID, req.body);
            const currentAplikimi = await this.aplikimiService.getAplikimiById(req.params.aplikimiID);

            try {
                if (currentAplikimi.statusi.statusi === "pranuar") {
                    const hashedPassword = await PasswordUtils.hashPassword(currentAplikimi.password);
                    
                    const newKlienti = await this.klientiService.createKlienti({
                        "adresa": currentAplikimi.adresa,
                        "qyteti": currentAplikimi.qyteti,
                        "kodi_postal": currentAplikimi.kodi_postal,
                        "shtetiID": currentAplikimi.shtetiID,
                        "aplikimiID": currentAplikimi.aplikimiID,
                        "email": currentAplikimi.email,
                        "emri_kompanise": currentAplikimi.emri_kompanise,
                        "password": hashedPassword
                    });
                    
                    await this.emailService.sendApplicationApprovedEmail(currentAplikimi);
                    console.log('Email sent for application approval with credentials');
                } else if (currentAplikimi.statusi.statusi === "refuzuar") {
                    const reason = req.body.Arsyeja || '';
                    await this.emailService.sendApplicationRejectedEmail(currentAplikimi, reason);
                    console.log('Rejection email sent');
                }
            } catch (emailError) {
                console.error('Error sending email:', emailError);
            }
            
            return res.status(200).json(updatedAplikimi);
        } catch (error) {
            if (error.message === "Aplikimi nuk u gjet") {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({
                    message: 'Error updating application',
                    error: error.message
                });
            }
        }
    }

    async deleteAplikimi(req, res) {
        try {
            await this.aplikimiService.deleteAplikimi(req.params.aplikimiID);
            return res.status(204).send();
        } catch (error) {
            if (error.message === "Aplikimi nuk u gjet") {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({
                    message: 'Error deleting application',
                    error: error.message
                });
            }
        }
    }
}

module.exports = AplikimiController;