const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const ContactRouter = require('./routes/contact')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors({ origin: true, credentials: true }))
app.use(express.json({ extended: false }))

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
})

//create database conncetion
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log('MongoDB Connection Established.')
})

app.use('/contact', ContactRouter)

app.listen(port, ()=> {
    console.log(`Server is running at port ${port}`) 
});