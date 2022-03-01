require('dotenv').config()
const express = require('express');
const app = express();
const router = express.Router;
const cors = require('cors');
app.use(cors);
const nodemailer = require('nodemailer');

const PORT = 9000

app.listen(PORT, ()=> {
    console.log(`App running on port ${PORT} `)
})