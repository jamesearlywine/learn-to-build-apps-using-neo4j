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

  res.send(status);
}

module.exports = {
  post
};