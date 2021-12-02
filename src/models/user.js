const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const User = mongoose.model(
	'User',
	new mongoose.Schema({
		email: String,
		password: String,
	})
)

module.exports = () => {
	async function create({ email, password }) {
		if (!email || !password) {
			throw new Error('Email e password são obrigatorios')
		}

		if (await getByEmail(email)) throw 'Email já cadastrado'

		await User.create({ email, password: bcrypt.hashSync(password, 10) })
	}

	async function getByEmail(email) {
		return await User.findOne({ email })
	}

	async function validate({ email, password }) {
		const user = await getByEmail(email)

		if (!user || !bcrypt.compareSync(password, user.password)) throw 'Usuário ou senha inválida'

		return user
	}

	return { create, validate }
}
