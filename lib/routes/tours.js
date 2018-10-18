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
        // console.log(id);
        Tour.findOneAndUpdate(
            id, 
            { $push: { stops: req.stop } },
            { new: true }
        )
            .then(tour => res.json(tour))
            .catch(next);
    });

    // .delete('/tours/:id/stops/:stopId', (req, res, next) => {
    //     //remove a stop that got cancelled 
    //     const { id } = req.params;
    //     Cars.delete(id).then(remove => res.json(remove));
    // });

    

// .post('/tours/:id/stops/:stopId/attendence', (req, res) => {
//     //update a stop after it completes with number aof attendees. it should only update the attendane field of the stop, not other updates allowed
//     const { type, customerId, purchaseId } = req.body;
//     Event.create({ type, customerId, purchaseId }).then(event =>
//         res.json(event)
//     );
// })



// add, update, remove stops 

//The `/tours` API should offer CRUD for `GET`, `GET` by id, and `POST`
