const express = require('express');
const payment_route = express();

const bodyParser = require('body-parser');
payment_route.use(bodyParser.json());
payment_route.use(bodyParser.urlencoded({ extended:false }));

const path = require('path');

payment_route.set('view engine','html');
payment_route.set('views',path.join(__dirname, '../views'));

const paymentController = require('../controllers/paymentController');

payment_route.get('/', paymentController.renderProduct);
payment_route.post('/create/orderId', paymentController.createOrder);
payment_route.post('/api/payment/verify', paymentController.verify);

module.exports = payment_route;