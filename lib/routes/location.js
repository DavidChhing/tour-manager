const router = require('express').Router();
const Event = require('../models/Location');

module.exports = router
    .post('/', (req, res) => {
        const { type, customerId, purchaseId } = req.body;
        Event.create({ type, customerId, purchaseId }).then(event =>
            res.json(event)
        );
    })

    .get('/', (req, res) => {
        Event.find().then(events => res.json(events));
    })

    .get('/:id', (req, res) => {
        const { id } = req.params;
        Event.findById(id).then(event => res.json(event));
    });
