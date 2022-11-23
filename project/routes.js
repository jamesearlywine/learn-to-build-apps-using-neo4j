const indexController = require('./controller/index.js');
const personController = require('./controller/person.js');

module.exports = {
    forApp: function(app) {
        app.get('/', indexController.get);
        app.post('/person', personController.post)
    }
}

