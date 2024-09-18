const express = require('express');
const { PORT } = require('./config/env');
const connectToDb = require('./config/db');


const app = express();


connectToDb();


app.use(express.json);

app.get(`/`, ()=> {
    return res.json("Server is running correctly!")
})

app.listen(PORT || 8080 , ()=> {
    console.log(`Server is running on port: ${PORT}`)
})