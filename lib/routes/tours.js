const router = require('express').Router();
const Event = require('../models/Tour');

module.exports = router
    .get('/', (req, res) => {
        Event.find().then(events => res.json(events))
            .catch(next);
    })

    .get('/:id', (req, res) => {
        const { id } = req.params;
        Event.findById(id).then(event => res.json(event));
    })    

    .post('/', (req, res) => {
        const { type, customerId, purchaseId } = req.body;
        Event.create({ type, customerId, purchaseId }).then(event =>
            res.json(event)
        );
    })

    .post('/tours/:id/stops', (req, res) => {
        //add a stop to this tour
        const { type, customerId, purchaseId } = req.body;
        Event.create({ type, customerId, purchaseId }).then(event =>
            res.json(event)
        );
    })

    .post('/tours/:id/stops/:stopId/attendence', (req, res) => {
        //update a stop after it completes with number aof attendees. it should only update the attendane field of the stop, not other updates allowed
        const { type, customerId, purchaseId } = req.body;
        Event.create({ type, customerId, purchaseId }).then(event =>
            res.json(event)
        );
    })
    
    .delete('/tours/:id/stops/:stopId', (req, res) => {
        //remove a stop that got cancelled 
        const { id } = req.params;
        Cars.delete(id).then(remove => res.json(remove));
    });

// add, update, remove stops 

//The `/tours` API should offer CRUD for `GET`, `GET` by id, and `POST`
