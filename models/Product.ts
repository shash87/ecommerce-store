import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  images: [{
    type: String,
    required: true,
  }],
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
  features: [{
    type: String,
  }],
  dimensions: {
    length: Number,
    width: Number,
    height: Number,
  },
  material: String,
  color: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Product || mongoose.model('Product', productSchema);