var localStorageStore = require('./lib/localStorage');


var localstorage = localStorageStore({
    prefix: 'backbone-express-',
    serialize: JSON.stringify,
    deserialize: JSON.parse
});


module.exports = localstorage;
