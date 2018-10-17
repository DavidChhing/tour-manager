const createWeather = require('../../lib/util/createWeather');

describe('Weather middleware test', () => {

    it('returns weather information when supplied with a valid zip code', () => {
        
        const req = {
            body: { zip: '97124' }
        };

        let error, called = false;

        expect(called).toBeTruthy();
        expect(error).toBeFalsy();
        expect(req.locationResult).toEqual({ location: expect.any(Object), weather: })

    });




});
