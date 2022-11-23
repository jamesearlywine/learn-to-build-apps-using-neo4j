const Entity = require("./Entity");

module.exports = class Location extends Entity {
  constructor(properties) {
    super(properties);

    this.city = properties.city;
    this.state = properties.state;

    Object.assign(this, properties);
  }

  static fromNeo4jRecord (record) {
    return new Location({
      id: record._fields[0].identity.low,
      city: record._fields[0].properties.city,
      state: record._fields[0].properties.state,
    });
  }
};
