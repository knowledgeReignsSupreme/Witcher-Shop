const express = require('express');
const dotenv = require('dotenv');
const app = express();
const path = require('path');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

dotenv.config();

//Basic init
const PORT = process.env.PORT || 5800;

connectDB();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'images')));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const products = require('./routes/products');
const users = require('./routes/users');

app.use('/api/v1/products', products);
app.use('/api/v1/users', users);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
