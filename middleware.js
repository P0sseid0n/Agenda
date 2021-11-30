module.exports.auth = (req, res, next) => {
	return res.render('login_register', { csrfToken: req.csrfToken() })
}

module.exports.csurfCheck = (err, req, res, next) => {
	if (err && 'EBADCSRFTOKEN' === err.code) return res.status(404).render('Erro', { erro: 404 })

	next()
}
