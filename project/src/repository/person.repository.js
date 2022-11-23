const neo4j = require('../service/neo4j.client.provider').getNeo4jClient();

const createPerson = async (personDetails) => {
  const result = await neo4j.run(
    `create(a:Person {name:$personDetails.name})`,
    {
      personDetails
    }
  );
}

module.exports = {
  createPerson,
}