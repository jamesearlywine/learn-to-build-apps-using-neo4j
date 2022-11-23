const indexController = require('./controllers/index.js');
const personController = require('./controllers/person.js');

module.exports = {
    forApp: function(app) {
        app.get('/', indexController.get);
        app.post('/person', personController.post)
    }
}

