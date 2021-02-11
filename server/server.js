const express = require('express');
const dotenv = require('dotenv');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

dotenv.config({ path: '../.env' });

const limiter = rateLimit({
  windowMs: 10 * 60 * 10000,
  max: 100,
  message: 'Too many requests to the server, please try again later',
});

//Basic init
const PORT = process.env.PORT || 5800;

connectDB();

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(cookieParser());

app.use(mongoSanitize());
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", 'https://checkout.stripe.com'],
      frameSrc: ["'self'", 'https://checkout.stripe.com'],
      childSrc: ["'self'", 'https://checkout.stripe.com'],
      scriptSrc: ["'self'", 'https://checkout.stripe.com'],
      styleSrc: [
        "'self'",
        'https://fonts.googleapis.com',
        'https://checkout.stripe.com',
      ],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      imgSrc: ["'self'", 'https://*.stripe.com', 'https://res.cloudinary.com'],
      baseUri: ["'self'"],
    },
  })
);

app.use(xss());
app.use(limiter);
app.use(hpp());
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('API is running..');
  });
}

const products = require('./routes/products');
const users = require('./routes/users');
const orders = require('./routes/orders');

app.use('/api/v1/products', products);
app.use('/api/v1/users', users);
app.use('/api/v1/orders', orders);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
