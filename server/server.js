const express = require('express');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

dotenv.config();

//Basic init
const PORT = process.env.PORT || 5800;

const limiter = rateLimit({
  windowMs: 10 * 60 * 10000,
  max: 100,
  message: 'Too many requests to the server, please try again later',
});

connectDB();

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(cookieParser());

app.use(limiter);

const products = require('./routes/products');
const users = require('./routes/users');
const orders = require('./routes/orders');

app.use('/api/v1/products', products);
app.use('/api/v1/users', users);
app.use('/api/v1/orders', orders);
app.use(errorHandler);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, '../', 'client', 'build', 'index.html')
    );
  });
}

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
