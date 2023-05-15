const express = require('express')
const routes = require('./routes')
const handlebars = require('express-handlebars')



const app = express()
const PORT = process.env.PORT || 3000

app.engine('hbs', handlebars({ extname: '.hbs' }))
app.set('view engine', 'hbs')


app.use(routes)

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})