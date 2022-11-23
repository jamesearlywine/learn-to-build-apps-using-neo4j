module.exports = class PersonDetails {
  constructor(properties) {
    Object.assign(this, properties);
  }

  static fromIndexFormRequestBody (reqBody) {
    delete(reqBody.submit);

    return new PersonDetails({...reqBody});
  }
};
