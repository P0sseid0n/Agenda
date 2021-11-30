const express = require('express')
const router = express.Router()
const { auth } = require('./middleware')

router.get('/', auth, (req, res) => {
	res.render('index')
})

router.get('*', (req, res) => {
	res.status(404).render('404', { erro: 404 })
})

module.exports = router
