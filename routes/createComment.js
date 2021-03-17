var express = require('express');
var router = express.Router();
const ComentController = require('../controllers/ComentController')

/* GET home page. */
router.get('/', ComentController.create);

module.exports = router;
