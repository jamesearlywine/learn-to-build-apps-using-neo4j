const Entity = require("./Entity");

module.exports = class Person extends Entity {
  constructor(properties) {
    super(properties);

    this.name = properties.name;

    Object.assign(this, properties);
  }

  static fromNeo4jRecord (record) {
    return new Entity({
      id: record._fields[0].identity.low,
      name: record._fields[0].properties.name
    });
  }
};
