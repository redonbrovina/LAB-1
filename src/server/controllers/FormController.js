const express = require('express')
const router = express.Router()
const { Shteti } = require('../models')

// Initialize model
const shtetiModel = new Shteti()

router.get('/shtetet', async (req, res) => {
    try {
        console.log('Fetching countries...')
        const countries = await shtetiModel.findAll({
            orderBy: 'emri_shtetit'
        })
        
        const formattedCountries = countries.map(country => ({
            ShtetiID: country.shtetiID,
            Emri_shtetit: country.emri_shtetit
        }))
        
        res.json(formattedCountries)
    } catch (error) {
        console.log('Database Error when fetching countries', error)
        return res.status(500).json({
            message: 'Error fetching countries',
            error: error.message
        })
    }
})

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

router.get('/test', (req, res)=>{
    console.log(req.body)

    return res.status(200)
})

module.exports = router;