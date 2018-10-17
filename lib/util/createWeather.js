const { HttpError } = require('./errors');
const weatherService = require('./weather-service');

module.exports = (api = weatherService) => {

    return (req, res, next) => {
        if(req.body.zip) {
            api(req.body.zip)
                .then(data => {
                    req.stop = data;
                });
            next();
        }
        else {
            const error = new HttpError({
                code: 404,
                message: 'Invalid zip code'
            });
            next(error);
        }
    };
};
