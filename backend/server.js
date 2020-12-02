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

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname1,'/frontend/build')))

    app.get('*',(req, res) => res.sendFile(path.resolve(__dirname1, 'frontend', 'build', 'index.html')))
}else{
    app.get('/', (req,res) => {
        res.send('API is running...')
    });
}


//middlewares
app.use(notFound)
app.use(errorHandler)



const PORT = process.env.PORT || 5000

sequelize.sync()
    .then(result => {
    return User.findByPk(1) 
    })
    .then(user => {
        if(!user) {
            return User.create({name: 'Admin Doe', email: 'admin@example.com', password: '123456'})
        }
        return user
    })
    .then(user => {
        app.listen(PORT, console.log(`Server running on port ${PORT}`))
    })
    .catch(err => {console.log(err)})

 

