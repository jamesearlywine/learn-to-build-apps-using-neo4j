const PersonRepository = require("../repository/person.repository")
const PersonDetails = require("../entity/PersonDetails");

const post = async (req, res) => {
  const personDetails = PersonDetails.fromIndexFormRequestBody(req.body);

  console.log({
    method: "PersonController.post",
    message: "received personDetails",
    personDetails
  });

  let result;
  try {
    result = await PersonRepository.createPerson(personDetails);
  } catch (err) {
    result = { err };
  }

  console.log({
    method: "PersonController.post called PersonRepository.createPerson(personDetails)",
    result: JSON.stringify(result)
  });

  if (req.query.debug === "true") {
    res.json(result);
  } else {
    res.redirect("/");
  }

};

module.exports = {
  post
};