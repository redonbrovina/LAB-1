const KlientiService = require('../services/KlientiService');
const ShtetiService = require('../services/ShtetiService');
const RefreshTokenService = require('../services/RefreshTokenService');
const PasswordUtils = require('../utils/PasswordUtils');
const jwt = require('jsonwebtoken');

class KlientiController {
    constructor() {
        this.klientiService = new KlientiService();
        this.shtetiService = new ShtetiService();
        this.refreshTokenService = new RefreshTokenService();
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            console.log('KlientiController.login called with:', { email, password: '***' });
            
            if (!email || !password) {
                console.log('Missing email or password');
                return res.status(400).json({
                    message: 'Email dhe password janë të detyrueshëm'
                });
            }

            // Find client by email
            const klienti = await this.klientiService.getKlientiByEmail(email);
            console.log('Found klienti:', klienti ? 'YES' : 'NO');
            if (!klienti) {
                console.log('No client found with email:', email);
                return res.status(401).json({
                    message: 'Email ose password i gabuar'
                });
            }

            // Verify password
            let isPasswordValid = false;
            
            // First try bcrypt comparison (for hashed passwords)
            if (klienti.password && (klienti.password.startsWith('$2b$') || klienti.password.startsWith('$2a$') || klienti.password.startsWith('$2y$'))) {
                isPasswordValid = await PasswordUtils.comparePassword(password, klienti.password);
            } else {
                // For plain text passwords (legacy support)
                isPasswordValid = password === klienti.password;
            }
            
            if (!isPasswordValid) {
                console.log('Password validation failed');
                return res.status(401).json({
                    message: 'Email ose password i gabuar'
                });
            }
            
            console.log('Password validation successful');

            // Generate JWT token
            const token = jwt.sign(
                {
                    klientiID: klienti.klientiID,
                    email: klienti.email,
                    role: 'klient'
                },
                process.env.JWT_SECRET || 'your-secret-key',
                { expiresIn: '1h' }
            );

            // Generate refresh token
            const refreshToken = await this.refreshTokenService.createRefreshToken(klienti.klientiID, 'klient');

            // Set httpOnly cookies
            res.cookie('accessToken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 15 * 60 * 1000 // 15 minutes (matches JWT expiry)
            });
            
            res.cookie('refreshToken', refreshToken.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            });

            // Return client data without password
            const { password: _, ...clientData } = klienti.toJSON();

            console.log('Login successful, sending response');
            res.json({
                message: 'Login successful',
                klientiID: klienti.klientiID,
                email: klienti.email,
                user: {
                    ...clientData,
                    role: 'klient'
                }
            });

        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({
                message: 'Error during login',
                error: error.message
            });
        }
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

    async getPaginatedKlientet(req, res) {
        try {
            const { page = 1, limit = 5 } = req.query;
            const result = await this.klientiService.getPaginatedKlientet({ 
                page: parseInt(page), 
                limit: parseInt(limit) 
            });
            return res.status(200).json(result);
        } catch (error) {
            res.status(500).json({
                message: 'Error fetching paginated clients',
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

    async searchKlientet(req, res) {
        try {
            const { q } = req.query;
            if (!q || q.trim() === '') {
                return res.status(400).json({
                    message: 'Search query is required',
                    error: 'MISSING_QUERY'
                });
            }
            
            const klientet = await this.klientiService.searchKlientet(q.trim());
            return res.status(200).json(klientet);
        } catch (error) {
            res.status(500).json({
                message: 'Error searching clients',
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

    async changePassword(req, res) {
        try {
            console.log('Change password request received:', req.body);
            console.log('Client ID from params:', req.params.klientiID);
            console.log('User from auth:', req.user);
            
            const { currentPassword, newPassword } = req.body;
            const klientiID = req.params.klientiID;

            if (!currentPassword || !newPassword) {
                return res.status(400).json({
                    message: 'Current password and new password are required'
                });
            }

            // Get the current client data
            console.log('Fetching client data for ID:', klientiID);
            const klienti = await this.klientiService.getKlientiById(klientiID);
            console.log('Raw client object:', klienti);
            console.log('Client dataValues:', klienti?.dataValues);
            console.log('Client found:', { id: klienti?.klientiID || klienti?.dataValues?.klientiID, email: klienti?.email || klienti?.dataValues?.email, hasPassword: !!(klienti?.password || klienti?.dataValues?.password) });
            
            // Get the password from either direct property or dataValues
            const clientPassword = klienti.password || klienti.dataValues?.password;
            
            // Verify current password
            console.log('Verifying current password...');
            console.log('Client password field:', clientPassword ? 'Password exists' : 'No password');
            const isCurrentPasswordValid = await PasswordUtils.comparePassword(currentPassword, clientPassword);
            console.log('Password verification result:', isCurrentPasswordValid);
            
            if (!isCurrentPasswordValid) {
                return res.status(400).json({
                    message: 'Current password is incorrect'
                });
            }

            // Validate new password strength
            console.log('Validating new password strength...');
            const passwordValidation = PasswordUtils.validatePasswordStrength(newPassword);
            console.log('Password validation result:', passwordValidation);
            
            if (!passwordValidation.isValid) {
                return res.status(400).json({
                    message: passwordValidation.message
                });
            }

            // Hash the new password
            console.log('Hashing new password...');
            const hashedNewPassword = await PasswordUtils.hashPassword(newPassword);
            console.log('Password hashed successfully');

            // Update the password
            console.log('Updating password in database...');
            const clientId = klienti.klientiID || klienti.dataValues?.klientiID;
            await this.klientiService.updateKlienti(clientId, { password: hashedNewPassword });
            console.log('Password updated successfully');

            return res.status(200).json({
                message: 'Password changed successfully'
            });
        } catch (error) {
            console.error('Error in changePassword:', error);
            console.error('Error stack:', error.stack);
            
            if (error.message === "Klienti nuk u gjet") {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({
                    message: 'Error changing password',
                    error: error.message
                });
            }
        }
    }
}

module.exports = KlientiController;