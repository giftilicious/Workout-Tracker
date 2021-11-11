const router = require('express').Router()
const path = require('path');

// need a /exercise 
router.get('/exercise', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/exercise.html'))
})
// /stats routes
router.get('/stats', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/stats.html'))
})
// need / route
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

module.exports = router