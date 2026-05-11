const express = require('express')
const router = express.Router();
const aiController = require('../controllers/ai.controller')

router.post('/email-generator' , aiController.aiReviewController)


module.exports = router;

