const express = require('express')
const router = express.Router()
const pool = require('../database/Database')

router.get('/shtetet', (req, res)=>{
    console.log('Fetching countries...')
    pool.query(
        'SELECT ShtetiID, Emri_shtetit FROM shteti ORDER BY Emri_shtetit',
        (error, results) => {
            if(error) {
                console.log('Database Error when fetching countries', error)
                return res.status(500).json({
                    message: 'Error fetching countries',
                    error: error.message
                })
            }
            res.json(results)
        }
    )
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

module.exports = router