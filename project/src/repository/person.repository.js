const neo4j = require('../service/neo4j.client.provider').getNeo4jClient();
const Person = require ("../entity/Person");
const Friendship = require("../entity/relationship/Friendship");
const Birthplace = require("../entity/relationship/Birthplace");
const PersonWithBirthplace = require("../entity/PersonWithBirthplace");

const getAll = async() => {
  const result = await neo4j.run("MATCH (n:Person) RETURN n");
  const persons = result.records.map(Person.fromNeo4jRecord);

  return persons;
};

const getById = async(personId) => {
  const id = ""+personId;

  const result = await neo4j.run(`MATCH (person:Person) WHERE id(person)=${id} RETURN person`);
  const person = Person.fromNeo4jRecord(result.records[0]);

  return person;
};

const getPersonWithBirthplace = async(personId) => {
  const queryTemplate = `
    MATCH(person:Person) WHERE id(person)=$personId 
    WITH * OPTIONAL MATCH(person)-[birthplace:BIRTHPLACE]->(location:Location)
    RETURN person, birthplace, location
    ORDER BY id(birthplace) DESC LIMIT 1
  `;
  const data = {
    personId: +personId
  };

  console.log({
    method: "PersonRepository.getFullDetailsById",
    message: "was called",
    personId,
    queryTemplate,
    data
  });

  const result = await neo4j.run(queryTemplate, data);

  console.log({
    method: "PersonRepository.getFullDetailsById",
    message: "query completed",
    result: JSON.stringify(result)
  });

  const personWithBirthplace = PersonWithBirthplace.fromNeo4jRecord(result.records[0]);

  return personWithBirthplace;
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

const createFriendship = async (friendshipDetails) => {
  const { firstPersonName, secondPersonName } = friendshipDetails;

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
    friendshipDetails,
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
    method: "PersonRepository.createFriendship",
    message: "response entity Friendship created from result",
    friendship: JSON.stringify(friendship)
  });

  return friendship;
};

const createBirthplace = async (birthplaceDetails) => {
  const { personName, locationCity, locationState, year} = birthplaceDetails;

  const queryTemplate = `
    match (person:Person) WHERE person.name=$personName 
    WITH * match (location:Location) WHERE location.city=$locationCity AND location.state=$locationState 
    merge(person)-[relationship:BIRTHPLACE {year:$year}]-(location)
      
    return person, location, relationship
  `;
  const data = {
    personName,
    locationCity,
    locationState,
    year
  };

  console.log({
    method: "PersonRepository.createBirthplace",
    message: "was called with birthplaceDetails",
    birthplaceDetails,
    queryTemplate,
    data
  });

  const result = await neo4j.run(queryTemplate, data);

  console.log({
    method: "PersonRepository.createBirthplace",
    message: "neo4j query completed",
    result: JSON.stringify(result)
  });

  const birthplace = Birthplace.fromNeo4jRecord(result.records[0]);

  console.log({
    method: "PersonRepository.createBirthplace",
    message: "response entity Birthplace created from result",
    friendship: JSON.stringify(birthplace)
  });

  return birthplace;
};

module.exports = {
  getAll,
  getById,
  getPersonWithBirthplace,
  createPerson,
  createFriendship,
  createBirthplace
};