const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const path = require('path')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'src', 'views'))

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const routes = require('./routes')
app.use(routes)

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
