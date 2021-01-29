const mongoose = require('mongoose');
const slugify = require('slugify');

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
    },
    slug: String,
    category: {
      type: String,
      required: [true, 'Please add a category'],
      enum: ['silver-swords', 'steel-swords', 'armors', 'potions'],
    },

    type: {
      type: String,
      required: [true, 'Please provide a product type'],
    },

    tier: {
      type: String,
      required: [true, 'Please provide a valid tier'],
      enum: ['Witcher Item', 'Master', 'Magic', 'Common', 'Relic'],
    },

    effects: {
      type: [String],
      required: true,
      minlength: 1,
    },

    countInStock: {
      type: Number,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    rating: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    weight: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

ProductSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

module.exports = mongoose.model('Product', ProductSchema);
