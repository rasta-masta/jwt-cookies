const express = require('express')
const { tokenController } = require('../controllers')

const router = express.Router()

router.get('/token', tokenController.refreshToken);
module.exports = router;