module.exports = class PersonDetails {
  constructor(properties) {
    this.name = properties.name;

    Object.assign(this, properties);
  }

  static fromIndexFormRequestBody (reqBody) {
    delete(reqBody.submit);

    return new PersonDetails({...reqBody});
  }
};
