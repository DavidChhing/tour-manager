const createWeather = require('../../lib/util/createWeather');

describe('Weather middleware test', () => {

    it('returns weather information when supplied with a valid zip code', done => {
        const req = {
            body: { zip: '97124' }
        };

        let error, called = false;
        const next = err => {
            called = true;
            error = err; 

            expect(called).toBeTruthy();
            expect(error).toBeFalsy();


            expect(req.stop).toEqual({ location: expect.any(Object), weather: expect.any(Object) });
            done();
        };
        createWeather()(req, null, next);
    });


    it('returns an error if an invalid zipcode is supplied', done => {
        const req = {
            body: { zip: '9712' }
        };

        let error;
        const api = () => {
            return Promise.reject(error);
        };

        const middleware = createWeather(api);

        const next = err => {
            expect(err).toEqual(error);
            done();
        };

        middleware(req, null, next);
    });
});
