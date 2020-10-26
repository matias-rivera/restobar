const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser');
const morgan = require('morgan')

const sequelize = require('./database/database')


const User = require('./models/user')
require('./database/associations')


const app = express()
dotenv.config()

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}


app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))


//ROUTES
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')

app.use('/api/users', userRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/products', productRoutes)


/* app.get('/',(req, res) => {
    res.send('API is running...')
})

app.get('/api/products',(req, res) => {
    res.send('Products...')
}) */

//test connection
/*  try {
    async () => {
        await sequelize.authenticate();
    }
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }  */
//sequelize.sync({force:true})
sequelize.sync()
/*     .then(user => {
        
    })
    .catch(err => console.log(err)) */



/* User.create({
    name: 'Matias',
    password: '123456',
    email:'asd@sad.com'
}) */

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running on port ${PORT}`))