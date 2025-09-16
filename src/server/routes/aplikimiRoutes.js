const express = require('express')
const router = express.Router()
const controller = require('../controllers/AplikimiController')
const { authenticateToken, authorizeRoles } = require('../middleware/auth')

router.use(authenticateToken)

router.get('/:aplikimiID', controller.getAplikimiById)
router.get('/status/:aplikimiStatusID', controller.getAplikimiByAplikimiStatusID)
router.get('/', controller.getAllAplikimet)
router.post('/', controller.createAplikimi)
router.put('/:aplikimiID', controller.updateAplikimi)
router.delete('/:aplikimiID', controller.deleteAplikimi)

module.exports = router