module.exports = class Friendship {
  static RELATIONSHIP_TYPE = "FRIEND";

  constructor(properties) {
    this.id = properties.id;
    this.relationshipType = Friendship.RELATIONSHIP_TYPE;

    this.personA = properties.personA;
    this.personB = properties.personB;

    Object.assign(this.properties);
  }

  static fromNeo4jRecord = (record) => {
    const keys = {
      relationship: record.keys[2],
      personA: record.keys[0],
      personB: record.keys[1],
    };

    const relationship = record.get(keys.relationship);
    const personA = record.get(keys.personA);
    const personB = record.get(keys.personB);

    return new Friendship({
      id: relationship.identity.low,
      personA,
      personB
    });
  }
};