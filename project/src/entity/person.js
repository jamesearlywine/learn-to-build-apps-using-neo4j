module.exports = class Person {
  constructor(properties) {
    this.id = properties.id;
    this.name = properties.name;

    Object.assign(this, properties);
  }

  static fromNeo4jRecord (record) {
    return {
      id: record._fields[0].identity.low,
      name: record._fields[0].properties.name
    }
  }
}