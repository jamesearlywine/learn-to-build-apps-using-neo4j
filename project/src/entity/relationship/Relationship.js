module.exports = class Relationship {
  constructor(properties) {
    this.id = properties.id;
    this.relationshipType = properties.relationshipType;
    this.entityA = properties.entityA;
    this.entityB = properties.entityB;

    Object.assign(this, properties);
  }

  static fromNeo4jRecord = (record) => {
    const keys = {
      relationship: record.keys[2],
      entityA: record.keys[0],
      entityB: record.keys[1],
    };

    const relationship = record.get(keys.relationship);
    const entityA = record.get(keys.entityA);
    const entityB = record.get(keys.entityB);

    return new Relationship({
      id: relationship.identity.low,
      relationshipType: relationship.type,
      entityA,
      entityB
    });
  }
}