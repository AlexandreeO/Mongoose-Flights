const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  airport: {
    type: String,
    enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'], // Your choices for airports
    required: true,
  },
  arrival: {
    type: Date,
    required: true,
  },
});

module.exports = destinationSchema;
