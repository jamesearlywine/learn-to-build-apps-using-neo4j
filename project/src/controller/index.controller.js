const PersonRepository = require("../repository/person.repository")

const get = async (req, res) => {
    const persons = await PersonRepository.getAll();

    console.log({
        message: "IndexController.get",
        persons
    });

    res.render("index", {
        persons
    });
};

module.exports = {
    get
};
