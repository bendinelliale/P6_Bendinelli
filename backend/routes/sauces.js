
const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config')
const auth = require('../middleware/auth')
const sauceCon = require('../controllers/sauces');

router.get('/',auth,sauceCon.getAllSauces)
router.get('/:id',auth,sauceCon.getOneSauce)
router.post('/', auth,multer,sauceCon.createSauce)
router.put('/:id',auth , multer, sauceCon.modifySauce)
router.delete('/:id',auth,sauceCon.deleteSauce)
router.post('/:id/like',auth,sauceCon.likesAndDislikes)

module.exports = router ;