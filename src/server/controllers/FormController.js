//This is a placeholder for future middleware functions
const jwt = require('jsonwebtoken');
const { ShtetiService } = require('../services')
const shtetiService = new ShtetiService()
const {KlientiService} = require('../services')
const klientiService = new KlientiService();
const {AplikimiService} = require('../services')
const aplikimiService = new AplikimiService();

const checkLogin = async (req, res) =>{
    try{
        const {email, password} = req.body
        const klienti = await klientiService.getKlientiByEmail(email);
        if(klienti[0] && klienti[0].password == password){
            const token = jwt.sign(
                {id: klienti[0].klientiID, role: 'klient'},
                process.env.JWT_SECRET,
                {expiresIn: '1h'}
            )
            return res.status(200).json({token});
        } else {
            return res.status(401).json({message: 'Invalid email or password'});
        }
    } catch (error) {
        console.error('Error in checkLogin middleware:', error);
        throw new Error('Authentication check failed');
    }
}

const checkApplication = async (req, res)=>{
    try{
        const {email} = req.body
        const existingClient = await klientiService.getKlientiByEmail(email);
        if(existingClient.length > 0){
            return res.status(400).json({message: 'Email already in use'});
        } else {
            aplikimiService.createAplikimi(req.body);
            return res.status(200).json({message: 'Application created successfully'});
        }
    } catch(error){
        console.error('Error in checkApplication middleware:', error);
        throw new Error('Application check failed');
    }
}

const getAllShtetet = async (req, res)=>{
    try{
        console.log('Fetching countries...')
        const countries = await shtetiService.getAllShtetet()
        return res.status(200).json(countries)
    } catch (error) {
            res.status(500).json({
            message: 'Error fetching countries',
            error: error.message
        });
    }  
}

const logout = async (req, res) => {
    try {
        return res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error('Error in logout:', error);
        return res.status(500).json({ message: 'Logout failed' });
    }
}

module.exports = {
    checkLogin, 
    checkApplication,
    getAllShtetet,
    logout
}
