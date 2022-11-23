const PersonRespository = require("../repository/person.repository")

const post = async (req, res) => {
  const personDetails = {
    name: req.body.name
  };

  const status = {
    method: "PersonController.post",
    message: "received personDetails",
    personDetails
  }

  console.log(status);

  const result = await



  res.send(status);
}

module.exports = {
  post
};