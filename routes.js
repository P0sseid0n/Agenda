const express = require('express')
const router = express.Router()

const flash = require('connect-flash')
const csurf = require('csurf')
const session = require('express-session')
const MongoStore = require('connect-mongo')

const md5 = require('md5')

const { auth, csurfCheck } = require('./middleware')

const user = require('./src/controllers/user')
const contact = require('./src/controllers/contact')

router.use(
	session({
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: true,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24 * 7,
			httpOnly: true,
		},
		store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
	})
)

router.use(flash())
router.use(csurf())
router.use(csurfCheck)

router.get('/', contact.indexPage)

router.post('/register', user.register)
router.post('/login', user.login)
router.post('/logout', user.logout)

router.get('/contact/:id?', auth, contact.savePage)
router.post('/contact/:id', contact.edit)
router.post('/contact', contact.create)
router.post('/deleteContact/:id', contact.delete)

router.get('/profile', auth, (req, res) => {
	res.render('profile', { user: req.session.user, image: md5(req.session.user), csrfToken: req.csrfToken() })
})

router.get('*', (req, res) => {
	console.log('404')
	res.status(404).render('erro', { erro: 404 })
})

module.exports = router
