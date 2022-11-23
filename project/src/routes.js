const indexController = require('./controller/index.controller.js');
const personController = require('./controller/person.controller.js');

module.exports = {
    forApp: function(app) {
        app.get('/', indexController.get);
        app.post('/person', personController.post)
    }
}

