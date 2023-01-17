const express = require('express');
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes')
const cartRoutes = require('./routes/cartRoutes')
const fileUpload = require('express-fileupload');
const cors = require('cors');
const path = require('path')
app.use(fileUpload())
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/api/users', userRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/products', productRoutes)

mongoose.connect(process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD))
.then(() => console.log('connected to database successfuly'))

app.listen(process.env.PORT, () => {
    console.log(`App Started On Port: ${process.env.PORT}`)
})