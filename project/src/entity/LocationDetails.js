module.exports = class LocationDetails {
  constructor(properties) {
    Object.assign(this, properties);
  }

  static fromIndexFormRequestBody (reqBody) {
    delete(reqBody.submit);

    return new LocationDetails({...reqBody});
  }
};
