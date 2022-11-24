const neo4j = require('../service/neo4j.client.provider').getNeo4jClient();
const Person = require ("../entity/Person");
const Friendship = require("../entity/relationship/Friendship");

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

const createFriendship = async (options) => {
  const { firstPersonName, secondPersonName } = options;

  const queryTemplate = `
    match (personA:Person) WHERE personA.name=$firstPersonName 
    WITH * match (personB:Person) WHERE personB.name=$secondPersonName 
    merge(personA)-[relationship:FRIEND]-(personB)
      
    return personA, personB, relationship
  `;
  const data = {
    firstPersonName,
    secondPersonName
  };

  console.log({
    message: 'PersonRepository.createFriendship called',
    options,
    queryTemplate,
    data
  });

  const result = await neo4j.run(queryTemplate, data);

  console.log({
    message: 'PersonRepository.createFriendship query completed',
    result: JSON.stringify(result)
  });

  const friendship = Friendship.fromNeo4jRecord(result.records[0]);

  console.log({
    message: 'PersonRepository.createFriendship response entity created from result',
    friendship: JSON.stringify(friendship)
  });

  return friendship;
};

module.exports = {
  getAll,
  createPerson,
  createFriendship
};