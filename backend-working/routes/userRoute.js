const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/userController');
const auth = require('../middleware/Auth');

router.post('/register', ctrl.register);
router.post('/login', ctrl.login);
router.get('/list', auth, ctrl.list);

module.exports = router;
