const eventsResolver = require('./events');
const bookingResolver = require('./booking');
const userResolver = require('./auth');

const rootResolvers = {

...eventsResolver,
...bookingResolver,
...userResolver

}

    module.exports = rootResolvers;