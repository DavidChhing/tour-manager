const router = require('express').Router();
const Event = require('../models/Tour');

module.exports = router
    .get('/', (req, res) => {
        Event.find().then(events => res.json(events));
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
        const { type, customerId, purchaseId } = req.body;
        Event.create({ type, customerId, purchaseId }).then(event =>
            res.json(event)
        );
    })

    .post('/tours/:id/stops/:stopId/attendence', (req, res) => {
        const { type, customerId, purchaseId } = req.body;
        Event.create({ type, customerId, purchaseId }).then(event =>
            res.json(event)
        );
    })
    
    .delete('/tours/:id/stops/:stopId', (req, res) => {
        const { id } = req.params;
        Cars.delete(id).then(remove => res.json(remove));
    });
