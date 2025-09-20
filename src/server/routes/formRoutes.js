const express = require('express')
const router = express.Router()
const FormController = require('../controllers/FormController')

const controller = new FormController()

router.post('/login', controller.checkLogin.bind(controller))

router.post('/logout', controller.logout.bind(controller))

router.post('/refresh-token', controller.refreshToken.bind(controller))

router.get('/shtetet', controller.getAllShtetet.bind(controller))

module.exports = router