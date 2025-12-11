const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/orderController');
const auth = require('../middleware/Auth');

router.post('/', auth, ctrl.create);
router.get('/list', auth, ctrl.list);

module.exports = router;
