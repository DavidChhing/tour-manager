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
    })

    .put('/:id/stops/:stopId/attendance', (req, res) => {
        const { id, stopId } = req.params;
        const { attendance } = req.body;
        
        Tour
            .findOneAndUpdate(
                { '_id': id, 'stops._id': stopId },
                { '$set': { 'stops.$.attendance': attendance } },
                { new: true }
            )
            .then(tour => res.json(tour));
    });
