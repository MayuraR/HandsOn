const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('User home page')
})

router.get('/name', (req, res) => {
    res.send('User id page')
})

router.get('/id', (req, res) => {
    res.send('User id page')
})

module.exports = router;