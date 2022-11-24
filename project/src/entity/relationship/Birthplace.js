module.exports = class Birthplace {
  static RELATIONSHIP_TYPE = "BIRTHPLACE";

  constructor(properties) {
    this.id = properties.id;
    this.relationshipType = Birthplace.RELATIONSHIP_TYPE;

    this.person = properties.person;
    this.location = properties.location;
    this.year = properties.year;

    Object.assign(this.properties);
  }

  static fromNeo4jRecord = (record) => {
    const keys = {
      relationship: record.keys[2],
      person: record.keys[0],
      location: record.keys[1],
    };

    const relationship = record.get(keys.relationship);
    const person = record.get(keys.person);
    const location = record.get(keys.location);

    return new Birthplace({
      id: relationship.identity.low,
      year: relationship.properties.year,
      person,
      location
    });
  }
};