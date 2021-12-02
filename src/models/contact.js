const mongoose = require('mongoose')
const Contact = mongoose.model(
	'Contact',
	mongoose.Schema({
		nome: String,
		telefone: String,
	})
)

module.exports = () => {
	async function create({ nome, telefone }) {
		if (!nome || !telefone) {
			throw new Error('Nome e telefone são obrigatórios')
		}

		await Contact.create({ nome, telefone })
	}

	async function getById(id) {
		return await Contact.findById(id)
	}

	async function getAll() {
		return await Contact.find({})
	}

	async function update(id, { nome, telefone }) {
		await Contact.findByIdAndUpdate(id, { nome, telefone })
	}

	async function remove(id) {
		await Contact.findByIdAndRemove(id)
	}

	return { create, getById, getAll, update, remove }
}
