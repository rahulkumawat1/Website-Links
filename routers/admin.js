const express = require('express');
const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/', adminController.getHomePage);

router.get('/add-link', adminController.getAddLink);
router.post('/add-link', adminController.postAddLink);

router.get('/edit/:id/:index', adminController.getEditLink);
router.post('/edit', adminController.postEditLink);

router.get('/delete/:id', adminController.getDeleteSection);
router.get('/delete/:id/:index', adminController.getDeleteLink);

router.get('/users', adminController.getUsers);
router.post('/users/:id', adminController.postUserType);

router.get('/delete-user/:id', adminController.getDltUser);

module.exports = router;