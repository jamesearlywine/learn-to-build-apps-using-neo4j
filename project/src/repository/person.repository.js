const neo4j = require('../service/neo4j.client.provider').getNeo4jClient();

const createPerson = async (personDetails) => {
  const result = await neo4j.run(
    `
      unwind $personDetails as properties 
      create(person:Person {$...personDetails}) 
      SET person = properties 
      return person
    `,
    {
      personDetails
    }
  );
}

module.exports = {
  createPerson,
}