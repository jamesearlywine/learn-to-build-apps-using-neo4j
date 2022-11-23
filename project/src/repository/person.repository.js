const neo4j = require('../service/neo4j.client.provider').getNeo4jClient();

const createPerson = async (personDetails) => {
  const result = await neo4j.run(
    `
      create(person:Person) 
      SET person = $personDetails 
      return person
    `,
    {
      personDetails
    }
  );

  return result;
}

module.exports = {
  createPerson,
}