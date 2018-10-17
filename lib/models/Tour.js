const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: true
    },
    activities: {
        type: [String],
        required: true
    },
    launchDate: {
        type: Date,
        required: Date.now()
    },
    stops: [{
        locations: {
            city: String,
            State: {
                type: String,
                enum: ['WA', 'OR', 'CA', 'UT', 'NV', 'MN', 'PA', 'FL']
            },
            zip: {
                type: Number,
                required: true
            },
        },
        weather: {
            temperature: Number,
            condition: String,
            windSpeed: String
        },
        attendance: {
            type: Number,
            min: 1
        }
    }]
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;

// ---|---
// title | required title of the tour
// activities | array of string activites that will happen during the show
// launchDate | date tour will start. default to now
// stops | array of stop objects, see stop schema below

// location | object with city, state, and zip
// weather | object with weather conditions (see demo, choose some fields)
// attendence | number with min of 1
