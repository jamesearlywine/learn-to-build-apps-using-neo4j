const neo4j = require('../service/neo4j.client.provider').getNeo4jClient();
const Person = require ("../entity/Person");

const getAll = async() => {
  const result = await neo4j.run("MATCH (n:Person) RETURN n");
  const persons = result.records.map(Person.fromNeo4jRecord);

  return persons;
};

const createPerson = async (personDetails) => {
  const queryTemplate = `
    create(person:Person) 
    SET person = $personDetails 
      
    return person
  `;
  const data = {
    personDetails
  };

  console.log({
    method: "PersonRepository.createPerson called",
    queryTemplate,
    data
  });

  const result = await neo4j.run(queryTemplate, data);

  return Person.fromNeo4jRecord(result.records[0]);
};

const createRelationship = async (options) => {
  const { firstPersonName, secondPersonName, relationshipLabel } = options;

  const queryTemplate = `
    match (personA:Person) WHERE personA.name=$firstPersonName 
    WITH * match (personB:Person) WHERE personB.name=$secondPersonName 
    merge(personA)-[relationship:${relationshipLabel}]-(personB)
      
    return personA, personB, relationship
  `;
  const data = {
    firstPersonName,
    secondPersonName
  };

  console.log({
    message: 'PersonRepository.createRelationship called',
    options,
    queryTemplate,
    data
  });

  const result = await neo4j.run(queryTemplate, data);

  console.log({
    message: 'PersonRepository.createRelationship query completed',
    result: JSON.stringify(result)
  });

  const response = {
    personA: Person.fromNeo4jRecordField(
      result.records[0].get("personA")
    ),
    personB: Person.fromNeo4jRecordField(
      result.records[0].get("personB")
    ),
    relationship: result.records[0].get("relationship").type
  };

  console.log({
    message: 'PersonRepository.createRelationship response built',
    response: JSON.stringify(response)
  });

  return response;
};

module.exports = {
  getAll,
  createPerson,
  createRelationship
};