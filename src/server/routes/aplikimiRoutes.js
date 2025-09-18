const express = require('express')
const router = express.Router()
const AplikimiController = require('../controllers/AplikimiController')
const { authenticateToken, authorizeRoles } = require('../middleware/auth')

const controller = new AplikimiController()

router.use(authenticateToken)

router.get('/', controller.getAllAplikimet.bind(controller))
router.get('/status/:aplikimiStatusID', controller.getAplikimiByAplikimiStatusID.bind(controller))
router.get('/:aplikimiID', controller.getAplikimiById.bind(controller))
router.post('/', controller.createAplikimi.bind(controller))
router.put('/:aplikimiID', controller.updateAplikimi.bind(controller))
router.delete('/:aplikimiID', controller.deleteAplikimi.bind(controller))

module.exports = router