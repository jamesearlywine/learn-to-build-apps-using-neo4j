module.exports = class LocationDetails {
  constructor(properties) {
    this.city = properties.city;
    this.state = properties.state;

    Object.assign(this, properties);
  }

  static fromIndexFormRequestBody (reqBody) {
    delete(reqBody.submit);

    return new LocationDetails({...reqBody});
  }
};
