const PersonRepository = require("../repository/person.repository")

const post = async (req, res) => {
  const personDetails = {
    name: req.body.name
  };

  const status = {
    method: "PersonController.post",
    message: "received personDetails",
    personDetails
  };

  console.log(status);

  let result = {};
  try {
    result = await PersonRepository.createPerson(personDetails);
  } catch (err) {
    result.err = err;
  }

  const postWriteStatus = {
    method: "PersonController.post called PersonRepository.createPerson(personDetails)",
    result: result
  };

  console.log(postWriteStatus);

  res.send(postWriteStatus);
}

module.exports = {
  post
};