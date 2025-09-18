const KlientiController = require('../controllers/KlientiController')
const express = require('express')
const router = express.Router()
const { authenticateToken, authorizeRoles } = require('../middleware/auth')

const controller = new KlientiController()

//router.use(authenticateToken)

router.get('/', controller.getAllKlientet.bind(controller))
router.get('/search/:emri_kompanise', controller.getKlientiByEmri.bind(controller))
router.get('/shteti/:shtetiID', controller.getShtetiById.bind(controller))
router.get('/:klientiID', controller.getKlientiById.bind(controller))
router.post('/', controller.createKlienti.bind(controller))
router.put('/:klientiID', controller.updateKlienti.bind(controller))
router.delete('/:klientiID', controller.deleteKlienti.bind(controller))

module.exports = router