const neo4j = require('../service/neo4j.client.provider').getNeo4jClient();
const Location = require ("../entity/Location");

const getAll = async() => {
  const result = await neo4j.run("MATCH (n:Location) RETURN n");
  const locations = result.records.map(Location.fromNeo4jRecord);

  return locations;
};

module.exports = {
  getAll,
};