const express = require('express')
const router = express.Router()

const csurf = require('csurf')
const session = require('express-session')

const { auth, csurfCheck } = require('./middleware')

router.use(
	session({
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: true,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24 * 7,
			httpOnly: true,
		},
	})
)

router.use(csurf())

router.post('/login', (req, res) => {})

router.get('/', auth, (req, res) => {
	res.render('index')
})

router.get('*', (req, res) => {
	res.status(404).render('Erro', { erro: 404 })
})

module.exports = router
