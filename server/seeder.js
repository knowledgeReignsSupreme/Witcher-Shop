const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });

const Product = require('./models/Product');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const products = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/products.json`, 'utf-8')
);

const importData = async () => {
  try {
    await Product.create(products);
    console.log('Data imported...');
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

const deleteData = async () => {
  try {
    await Product.deleteMany();
    console.log('Data deleted...');
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if ((process.argv[2] = '-D')) {
  deleteData();
}
