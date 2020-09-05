const express = require('express');

const router = express.Router();


const Controller=require('../controller/controller');
console.log('router loaded');




router.post('/enter-user',Controller.enterUser);
router.post('/enter-order',Controller.enterOrder);

router.get('/order-details',Controller.orderDetails);
router.get('/update',Controller.update);

// for any further routes, access from here
// router.use('/routerName', require('./routerfile));


module.exports = router;