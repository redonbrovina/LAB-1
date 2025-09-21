const express = require('express')
const router = express.Router()
const AplikimiController = require('../controllers/AplikimiController')
const { authenticateToken, requireRole } = require('../middleware/auth')

const controller = new AplikimiController()

// POST (create) nuk kërkon authentication - për signup
router.post('/', controller.createAplikimi.bind(controller))

router.use(authenticateToken)
router.use(requireRole('admin'));

router.get('/', controller.getAllAplikimet.bind(controller))
router.get('/status/:aplikimiStatusID', controller.getAplikimiByAplikimiStatusID.bind(controller))
router.get('/:aplikimiID', controller.getAplikimiById.bind(controller))
router.put('/:aplikimiID', controller.updateAplikimi.bind(controller))
router.delete('/:aplikimiID', controller.deleteAplikimi.bind(controller))

module.exports = router