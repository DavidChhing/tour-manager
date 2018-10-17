const router = require('express').Router();
const Tour = require('../models/Tour');
const weatherService = require('../util/weather-service');

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
        const { title, activities, launchDate } = req.body;
        
        Tour
            .create({ title, activities, launchDate })
            .then(tour => res.json(tour))
            .catch(next);
    })

    .post('/tours/:id/stops', (req, res, next) => {
        //add a stop to this tour
        const { type, customerId, purchaseId } = req.body;
        Tour.create({ type, customerId, purchaseId }).then(tour =>
            res.json(tour)
                .catch(next)
        );
    });

// .post('/tours/:id/stops/:stopId/attendence', (req, res) => {
//     //update a stop after it completes with number aof attendees. it should only update the attendane field of the stop, not other updates allowed
//     const { type, customerId, purchaseId } = req.body;
//     Event.create({ type, customerId, purchaseId }).then(event =>
//         res.json(event)
//     );
// })

// .delete('/tours/:id/stops/:stopId', (req, res) => {
//     //remove a stop that got cancelled 
//     const { id } = req.params;
//     Cars.delete(id).then(remove => res.json(remove));
// });

// add, update, remove stops 

//The `/tours` API should offer CRUD for `GET`, `GET` by id, and `POST`
