const express = require('express')
const router = express.Router()
const controller = require('../controllers/FormController')

router.post('/login', controller.checkLogin)

router.post('/signup', controller.checkApplication)

router.post('/logout', controller.logout)

router.get('/shtetet', controller.getAllShtetet)

module.exports = router