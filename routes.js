const express = require('express')
const router = express.Router()
const { auth } = require('./middleware')

router.get('*', (req, res) => {
	res.status(404).render('404', { erro: 404 })
})

router.use(auth)

router.get('/', (req, res) => {
	res.render('index')
})

module.exports = router
