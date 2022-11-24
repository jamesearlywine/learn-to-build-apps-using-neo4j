const PersonRepository = require("../repository/person.repository")
const PersonDetails = require("../entity/PersonDetails");
const FriendshipDetails = require("../entity/relationship/FriendshipDetails")
const BirthplaceDetails = require("../entity/relationship/BirthplaceDetails");

const post = async (req, res) => {
  const personDetails = PersonDetails.fromIndexFormRequestBody(req.body);

  console.log({
    method: "PersonController.post",
    message: "received personDetails",
    personDetails
  });

  let result;
  try {
    result = await PersonRepository.createPerson(personDetails);
  } catch (err) {
    result = { err };
  }

  console.log({
    method: "PersonController.post called PersonRepository.createPerson(personDetails)",
    result: JSON.stringify(result)
  });

  if (req.query.debug === "true") {
    res.json(result);
  } else {
    res.redirect("/");
  }

};

const createFriendship = async (req, res) => {
  const friendshipDetails = FriendshipDetails.fromIndexFormRequestBody(req.body);

  console.log({
    method: "PersonController.createFriendship",
    message: "received friendshipDetails",
    friendshipDetails
  });

  let result;
  try {
    result = await PersonRepository.createFriendship(friendshipDetails);
  } catch (err) {
    result = { err };
  }

  console.log({
    method: "PersonController.createFriendship",
    message:  "called PersonRepository.createRelationship(friendshipDetails)",
    result: JSON.stringify(result)
  });

  if (req.query.debug === "true") {
    res.json(result);
  } else {
    res.redirect("/");
  }
};

const createBirthplace = async(req, res) => {
  const birthplaceDetails = BirthplaceDetails.fromIndexFormRequestBody(req.body);

  console.log({
    method: "PersonController.createBirthplace",
    message: "received birthplaceDetails",
    birthplaceDetails
  });

  let result;
  try {
    result = await PersonRepository.createBirthplace(birthplaceDetails);
  } catch (err) {
    result = { err }
  }

  console.log({
    method: "PersonController.createBirthplace",
    message: "called PersonRepository.createBirthplace(birthplaceDetails)",
    result
  });

  if (req.query.debug === "true") {
    res.json(result);
  } else {
    res.redirect("/");
  }
};

module.exports = {
  post,
  createFriendship,
  createBirthplace,
};