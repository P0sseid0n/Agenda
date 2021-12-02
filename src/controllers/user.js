const User = require('../models/user')()
module.exports.register = (req, res) => {
	const {
		email,
		password: [password],
	} = req.body

	if (!email || !password) res.status(400).json({ error: 'Dados insuficientes' })

	User.create({ email, password })
		.then(() => {
			req.flash('registered', email)
			req.flash('successes', 'Conta criada com sucesso.')
			res.redirect('back')
		})
		.catch(error => {
			req.flash('errors', error)
			res.status(500).redirect('/')
		})
}

module.exports.login = (req, res) => {
	const { email, password } = req.body

	if (!email || !password) res.status(400).json({ error: 'Dados insuficientes' })

	User.validate({ email, password })
		.then(user => {
			req.session.user = user.email
			req.session.save(function () {
				res.status(200).redirect('/')
			})
		})
		.catch(error => {
			req.flash('errors', error)
			res.status(500).redirect('/')
		})
}

module.exports.logout = (req, res) => {
	req.session.destroy(function () {
		res.status(200).redirect('/')
	})
}
