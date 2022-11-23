const neo4j = require('../service/neo4j.client.provider').getNeo4jClient();

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

  const result = await neo4j.run(
    `create(a:Person {name:$personDetails.name})`,
    {
      personDetails
    }
  );



  res.send(status);
}

module.exports = {
  post
};