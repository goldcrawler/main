const express = require('express');
const prices = require("../controller/prices");
const router = express.Router();


router.use(express.urlencoded({extended: true}));
router.get('/kimia', prices.kimia)
router.get('/mamad', prices.mamad)


module.exports = router

