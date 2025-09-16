const controller = require('../controllers/KlientiController')
const express = require('express')
const router = express.Router()
const { authenticateToken, authorizeRoles } = require('../middleware/auth')

//router.use(authenticateToken)

router.get('/search/:emri_kompanise', controller.getKlientiByEmri)
router.get('/:klientiID', controller.getKlientiById)
router.get('/', controller.getAllKlientet)
router.get('/shteti/:shtetiID', controller.getShtetiById)
router.post('/', controller.createKlienti)
router.put('/:klientiID', controller.updateKlienti)
router.delete('/:klientiID', controller.deleteKlienti)

module.exports = router