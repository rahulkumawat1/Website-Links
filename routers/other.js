const express = require('express');
const otherController = require('../controllers/other');

const router = express.Router();

router.get('/login', otherController.getLogin)
router.post('/login', otherController.postLogin)

router.get('/logout', otherController.getLogout)

router.get('/signup', otherController.getSignUp)
router.post('/signup', otherController.postSignUp)

router.get('/not-auth', otherController.getNotAuth)

module.exports = router;