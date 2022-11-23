const neo4j = require('../service/neo4j.client.provider').getNeo4jClient();
const Person = require ("../entity/Person");

const getAll = async() => {
  const result = await neo4j.run("MATCH (n:Person) RETURN n");
  const persons = result.records.map(Person.fromNeo4jRecord);

  return persons;
};

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

  return Person.fromNeo4jRecord(result.records[0]);
};

module.exports = {
  getAll,
  createPerson,
};