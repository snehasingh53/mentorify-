const express = require('express');
const router = express.Router(); // Initialize the router
const services = require('../controllers/service-controller'); // Ensure correct path

router.get('/service', services.getService); 

module.exports = router;
