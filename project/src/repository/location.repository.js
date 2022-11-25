const neo4j = require('../service/neo4j.client.provider');
const Location = require ("../entity/Location");

const getAll = async() => {
  const result = await neo4j.run("MATCH (n:Location) RETURN n");
  const locations = result.records.map(Location.fromNeo4jRecord);

  return locations;
};

const createLocation = async (locationDetails) => {
  const result = await neo4j.run(
    `
      create(location:Location) 
      SET location = $locationDetails 
      return location
    `,
    {
      locationDetails
    }
  );

  return Location.fromNeo4jRecord(result.records[0]);
};

module.exports = {
  getAll,
  createLocation
};