const IndexController = require('./controller/index.controller.js');
const PersonController = require('./controller/person.controller.js');

module.exports = {
    forApp: function(app) {
        app.get('/', IndexController.get);
        app.post('/person', PersonController.post)
    }
}

