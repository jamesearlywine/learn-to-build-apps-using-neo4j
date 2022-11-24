module.exports = class FriendshipDetails {
  static RELATIONSHIP_LABEL = "FRIEND";

  constructor(properties) {
    this.firstPersonName = properties.firstPersonName;
    this.secondPersonName = properties.secondPersonName;
    this.relationshipLabel = FriendshipDetails.RELATIONSHIP_LABEL;

    Object.assign(this, properties);
  }

  static fromIndexFormRequestBody (reqBody) {
    delete(reqBody.submit);

    return new FriendshipDetails({...reqBody});
  }
};
