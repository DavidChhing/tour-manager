const router = require('express').Router();
const Tour = require('../models/Tour');
const createWeather = require('../util/createWeather')();

module.exports = router

    .get('/', (req, res, next) => {

        Tour
            .find()
            .then(tours => res.json(tours))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        const { id } = req.params;

        Tour
            .findById(id)
            .lean()
            .then(tour => res.json(tour))
            .catch(next);
    })

    .post('/', (req, res, next) => {
        const { title, activities, launchDate, stops } = req.body;
        
        Tour
            .create({ title, activities, launchDate, stops })
            .then(tour => res.json(tour))
            .catch(next);
    })

    .post('/:id/stops', createWeather, (req, res, next) => {
        const { id } = req.params;
        Tour.findOneAndUpdate(
            id, 
            { $push: { stops: req.stop } },
            { new: true }
        )
            .then(tour => res.json(tour))
            .catch(next);
    })

    .delete('/:tourId/stops/:stopId', (req, res, next) => {
        const { tourId, stopId } = req.params;
        
        Tour
            .findOneAndUpdate(
                tourId, 
                { $pull: { stops: { _id: stopId } } }, 
                { new: true }
            )
            .then(result => res.json(result))
            .catch(next);
    });

    
    

// .post('/tours/:id/stops/:stopId/attendence', (req, res) => {
//     //update a stop after it completes with number aof attendees. it should only update the attendane field of the stop, not other updates allowed
//     const { type, customerId, purchaseId } = req.body;
//     Event.create({ type, customerId, purchaseId }).then(event =>
//         res.json(event)
//     );
// })



// add, update, remove stops 

//The `/tours` API should offer CRUD for `GET`, `GET` by id, and `POST`
