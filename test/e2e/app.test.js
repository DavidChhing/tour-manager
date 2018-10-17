require('dotenv').config();
const { dropCollection } = require('../unit/db');
const request = require('supertest');
const app = require('../../lib/app');
const Chance = require('chance');
const chance = new Chance();

describe('tours end to end test', () => {

    let tours = [
        {
            title: 'Rolly Roos',
            activities: ['bar hopping', 'playing tag'],
            launchDate: chance.date()
        },
        {
            title: 'Round n Round',
            activities: ['Monkey Watching', 'Walnut picking'],
            launchDate: chance.date()
        },
        {
            title: 'Conduit Run',
            activities: ['Baking classes', 'Tree climbing'],
            launchDate: chance.date()
        },
    ];    

    let createdTours;

    const createdTour = tour => {
        return request(app)
            .post('/api/tours')
            .send(tour)
            .then(res => res.body);
    };

    beforeEach(() => {
        return dropCollection('tours');
    });

    beforeEach(() => {
        return Promise.all(tours.map(createdTour))
            .then(tourRes => createdTours = tourRes);
    });

    it('creates a tour', () => {
        
        const data = {
            title: chance.string(),
            activities: [chance.string(), chance.string()],
            launchDate: chance.date()
        };
        
        return request(app)
            .post('/api/tours')
            .send(data)
            .then(({ body }) => expect(body.title).toEqual(data.title));
    });

    it('gets all tours', () => {
        return request(app)
            .get('/api/tours')
            .then(retrievedTours => {
                createdTours.forEach(createdTour => {
                    expect(retrievedTours.body).toContainEqual(createdTour);
                });
            });
    });  

    it('gets a tour by id', () => {
        return request(app)
            .get(`/api/tours/${createdTours[0]._id}`)
            .then(res => {
                expect(res.body).toEqual({ ...createdTours[0] });
            });
    });

    it('adds a stop to a tour', () => {
        const stop = { zip: '97124' };
        return request(app)
            .post(`api/tours/${createdTours[1]._id}/stops`)
            .send(stop)
            .then(({ body }) => expect(body.stops[1].location.zip).toEqual(stop.zip));
    });

});
