const PersonRepository = require("../repository/person.repository");
const LocationRepository = require("../repository/location.repository");

const get = async (req, res) => {
    const persons = await PersonRepository.getAll();
    const locations = await LocationRepository.getAll();

    console.log({
        method: "IndexController.get",
        message: "rendering persons and locations",
        persons,
        locations
    });

    res.render("index", {
        persons,
        locations
    });
};

module.exports = {
    get
};
