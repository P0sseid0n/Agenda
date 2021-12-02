const Contact = require('../models/contact')()

module.exports.indexPage = (req, res) => {
	Contact.getAll().then(contacts => {
		res.render('index', { csrfToken: req.csrfToken(), contatos: contacts, logged: !!req.session.user })
	})
}

module.exports.savePage = (req, res) => {
	if (req.params.id) {
		Contact.getById(req.params.id).then(contact => {
			res.render('editContact', { csrfToken: req.csrfToken(), contato: contact })
		})
	} else {
		res.render('addContact', { csrfToken: req.csrfToken(), errors: req.flash('errors') })
	}
}

module.exports.create = (req, res) => {
	const { nome, telefone } = req.body

	if (!nome || !telefone) res.status(400).json({ error: 'Dados insuficientes' })

	Contact.create({ nome, telefone })
		.then(() => {
			res.redirect('/')
		})
		.catch(error => {
			req.flash('errors', 'Ocorreu um erro')
			console.log(error)
			res.status(500).redirect('back')
		})
}

module.exports.edit = (req, res) => {
	const { nome, telefone } = req.body

	if (!nome || !telefone) res.status(400).json({ error: 'Dados insuficientes' })

	Contact.update(req.params.id, { nome, telefone })
		.then(() => {
			res.redirect('/')
		})
		.catch(error => {
			res.status(500).redirect('back')
		})
}

module.exports.delete = (req, res) => {
	Contact.remove(req.params.id)
		.then(() => {
			res.redirect('/')
		})
		.catch(error => {
			res.status(500).redirect('back')
		})
}
