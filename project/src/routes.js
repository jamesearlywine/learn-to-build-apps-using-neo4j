const IndexController = require('./controller/index.controller.js');
const PersonController = require('./controller/person.controller.js');
const LocationController = require("./controller/location.controller");
module.exports = {
    forApp: function(app) {
        app.get('/', IndexController.get);

        app.post('/person', PersonController.post);
        app.post('/friendship', PersonController.createFriendship)
        app.post('/birthplace', PersonController.createBirthplace)

        app.post('/location', LocationController.post);
    }
}

