module.exports = class Entity {
  constructor(properties) {
    this.id = properties.id;

    Object.assign(this, properties);
  }

  static fromNeo4jRecord (record) {
    return new Entity({
      id: record._fields[0].identity.low,
    });
  }
};
