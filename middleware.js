module.exports.auth = (req, res, next) => {
	if (req.session.user) next()
	else {
		res.status(401).render('login_register', {
			csrfToken: req.csrfToken(),
			errors: req.flash('errors'),
			email: req.flash('registered')[0],
			successes: req.flash('successes'),
		})
	}
}

module.exports.csurfCheck = (err, req, res, next) => {
	if (err && 'EBADCSRFTOKEN' === err.code) return res.status(400).render('erro', { erro: 400 })

	next()
}
