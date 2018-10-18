const weatherService = require('./weather-service');
const { HttpError } = require('./error');

module.exports = function createWeather(api = weatherService) {

    return (req, res, next) => {
        if(req.body.zip) {
            console.log(req.body.zip, 'HIIIIIIDIIFIDIFIF');
            api(req.body.zip)
                .then(data => {
                    req.stop = data;
                    next();
                })
                .catch(next);
        } else {
            const httpError = new HttpError({
                code: 404,
                message: 'Invalid zip code'
            });
            next(httpError);
        }
    };
};
