const neo4j = require('../service/neo4j.client.provider').getNeo4jClient();

const createPerson = async (personDetails) => {
  const result = await neo4j.run(
    `
      create(person:Person {$...personDetails}) 
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