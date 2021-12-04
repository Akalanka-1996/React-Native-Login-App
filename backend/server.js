const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv').config();

const connectDB = require('./config/connection')

const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

//log requests
app.use(morgan('tiny'));

// db connection

connectDB();

//load routes
const userRouter = require('./routes/user')
app.use('/users', userRouter)

// error middlewares
const {notFound, errorHandler} = require('./middlewares/errormiddlewears')
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})