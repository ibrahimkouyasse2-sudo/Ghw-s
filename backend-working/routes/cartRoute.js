const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/cartController');
const auth = require('../middleware/Auth');

router.get('/', auth, ctrl.get);
router.post('/', auth, ctrl.update);

module.exports = router;
