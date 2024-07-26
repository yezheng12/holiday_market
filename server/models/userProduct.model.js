const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserProductSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  orderDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    default: 'Pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('UserProduct', UserProductSchema);

