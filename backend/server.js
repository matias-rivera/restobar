const express = require('express')
const dotenv = require('dotenv')
const app = express()

dotenv.config()

app.get('/',(req, res) => {
    res.send('API is running...')
})

app.get('/api/products',(req, res) => {
    res.send('Products...')
})

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running on port ${PORT}`))