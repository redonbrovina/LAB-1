const express = require('express')
const router = express.Router()
const { ShtetiService } = require('../services')
const shtetiService = new ShtetiService()


router.post('/login', (req, res)=>{
    console.log(req.body)
    const {email, password} = req.body
    console.log("Received: ", email, password)
    return res.status(200).json({message: `Login data received ${email}, ${password}`})
})

router.post('/signup', (req, res)=>{
    console.log(req.body)
    const {companyName, email, address, country, city, postalCode, password} = req.body
    console.log("Received: ", companyName, email, address, country, city, postalCode, password)
    return res.status(200).json({message: `Signup data received: ${companyName}, ${email}, ${address}, ${country}, ${city}, ${postalCode}, ${password}`})
})

router.get('/shtetet', async (req, res) => {
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
})

module.exports = router