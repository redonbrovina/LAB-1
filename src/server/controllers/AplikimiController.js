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
            const newAplikimi = await this.aplikimiService.createAplikimi(req.body);
            
            // Dërgo email për admin kur ka aplikim të ri
            try {
                await this.emailService.sendAdminNotificationEmail(newAplikimi);
                console.log('Email i dërguar për admin për aplikim të ri');
            } catch (emailError) {
                console.error('Gabim në dërgimin e email-it për admin:', emailError);
                // Mos e ndal operacionin nëse email-i dështon
            }
            
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
            const hashedPassword = await PasswordUtils.hashPassword(currentAplikimi.password);

            // Dërgo email bazuar në statusin e ri
            try {
                if (currentAplikimi.statusi.statusi === "pranuar") {
                    // Krijoni klientin së pari
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
                    
                    // Dërgo email për pranim ME kredencialet
                    await this.emailService.sendApplicationApprovedEmail(currentAplikimi);
                    console.log('Email i dërguar për pranim të aplikimit me kredencialet');
                    
                } else if (currentAplikimi.statusi.statusi === "refuzuar") {
                    // Fshi klientin nëse ekziston (për të parandaluar login)
                    try {
                        const existingKlienti = await this.klientiService.getKlientiByAplikimiID(currentAplikimi.aplikimiID);
                        if (existingKlienti && existingKlienti.klientiID) {
                            await this.klientiService.deleteKlienti(existingKlienti.klientiID);
                            console.log('Klienti u fshi pas refuzimit të aplikimit');
                        } else {
                            console.log('Nuk ka klient për të fshirë për këtë aplikim');
                        }
                    } catch (deleteError) {
                        console.log('Gabim në fshirjen e klientit:', deleteError.message);
                    }
                    
                    // Dërgo email për refuzim
                    const reason = req.body.arsyeja || '';
                    await this.emailService.sendApplicationRejectedEmail(currentAplikimi, reason);
                    console.log('Email i dërguar për refuzim të aplikimit');
                }
            } catch (emailError) {
                console.error('Gabim në dërgimin e email-it:', emailError);
                // Mos e ndal operacionin nëse email-i dështon
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