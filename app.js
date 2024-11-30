const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const port = process.env.PORT;
const dbURL = process.env.MONGO_URI;


const taskRoutes = require('./routes/taskRoutes');
// Database Connection

// Routes
app.use('/api/task', taskRoutes);

app.listen(port,()=>{
    mongoose.connect(dbURL)
    .then(()=>console.log(`DB is connection!!`))
    .catch((err)=>console.log(err))
    console.log(`Server start at http://localhost:${port}`);
})