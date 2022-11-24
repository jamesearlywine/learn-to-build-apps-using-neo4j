const Entity = require("./Entity");

module.exports = class Person extends Entity {
  constructor(properties) {
    super(properties);

    this.name = properties.name;

    Object.assign(this, properties);
  }

  static fromNeo4jRecord (record) {
    return Person.fromNeo4jRecordField(record._fields[0]);
  }

  static fromNeo4jRecordField (field) {
    return {
      id: field.identity.low,
      name: field.properties.name
    }
  }
};
