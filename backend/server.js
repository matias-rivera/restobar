const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser');
const morgan = require('morgan')
const path = require('path')

const sequelize = require('./database/database')

const {notFound, errorHandler} = require('./middleware/errorMiddleware')

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
const clientRoutes = require('./routes/client')
const tableRoutes = require('./routes/table')
const orderRoutes = require('./routes/order')
const uploadRoutes = require('./routes/upload')


app.use('/api/users', userRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/products', productRoutes)
app.use('/api/clients', clientRoutes)
app.use('/api/tables',tableRoutes)
app.use('/api/orders',orderRoutes)
app.use('/api/upload', uploadRoutes)


const __dirname1 = path.resolve()
app.use('/uploads', express.static(path.join(__dirname1, '/uploads')))


//middlewares
app.use(notFound)
app.use(errorHandler)


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
/* sequelize.sync({force:true}).then(user =>
    User.create({
        name: 'Admin',
        password: '123456',
        email:'admin@example.com',
        isAdmin: true
    }) 
) */
sequelize.sync()
/*     .then(user => {
        
    })
    .catch(err => console.log(err)) */



 

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running on port ${PORT}`))