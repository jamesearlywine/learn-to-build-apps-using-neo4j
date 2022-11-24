module.exports = class BirthplaceDetails {
  constructor(properties) {
    this.personName = properties.personName;
    this.locationCity = properties.locationCity;
    this.locationState = properties.locationState;

    Object.assign(this, properties);
  }

  static fromIndexFormRequestBody (reqBody) {
    delete(reqBody.submit);

    return new BirthplaceDetails({...reqBody});
  }
};
