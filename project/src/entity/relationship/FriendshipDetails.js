module.exports = class FriendshipDetails {
  constructor(properties) {
    this.firstPersonName = properties.firstPersonName;
    this.secondPersonName = properties.secondPersonName;

    Object.assign(this, properties);
  }

  static fromIndexFormRequestBody (reqBody) {
    delete(reqBody.submit);

    return new FriendshipDetails({...reqBody});
  }
};
