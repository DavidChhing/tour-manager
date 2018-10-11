const mongoose = require('mongoose');

const TourSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['purchase', 'shipped', 'returned', 'complete'],
        required: true
    },
    callbacks: {
        type: [String],
        default: []
    }
});

const Tour = mongoose.model('Tour', TourSchema);

module.exports = Tour;
