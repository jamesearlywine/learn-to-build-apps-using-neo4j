const Entity = require("./Entity");

module.exports = class PersonWithBirthplace extends Entity {
  constructor(properties) {
    super(properties);

    this.name = properties.name;
    this.age = properties.age;

    this.birthplace = properties.birthplace
      ? {
          year: properties.birthplace.year,
          city: properties.birthplace.city,
          state: properties.birthplace.state
        }
      : null
    ;

    Object.assign(this, properties);
  }

  static fromNeo4jRecord(record) {
    if (!record) {return null}

    return new PersonWithBirthplace({
      id: record.get("person")?.identity.low,
      name: record.get("person")?.properties.name,
      age: record.get("person")?.properties.age?.low,
      birthplace: record.get("birthplace")
      ? {
          year: record.get("birthplace")?.properties.year,
          city: record.get("location")?.properties.city,
          state: record.get("location")?.properties.state
        }
      : null
    });
  };
};