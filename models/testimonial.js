const Mongoose = require('mongoose');
const { Schema } = Mongoose;

const TestimonialSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  initials: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  quote: {
    type: String,
    required: true,
    trim: true
  },
  rating: {
    type: Number,
    required: true,
    default: 5
  },
  isActive: {
    type: Boolean,
    default: true
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Mongoose.model('Testimonial', TestimonialSchema);
