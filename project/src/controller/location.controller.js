const LocationRepository = require("../repository/location.repository")
const LocationDetails = require("../entity/LocationDetails");

const post = async (req, res) => {
  const locationDetails = LocationDetails.fromIndexFormRequestBody(req.body);

  console.log({
    method: "LocationController.post",
    message: "received locationDetails",
    locationDetails
  });

  let result;
  try {
    result = await LocationRepository.createLocation(locationDetails);
  } catch (err) {
    result = { err };
  }

  console.log({
    method: "LocationController.post called LocationRepository.createPerson(locationDetails)",
    result: JSON.stringify(result)
  });

  if (req.query.debug === "true") {
    res.json(result);
  } else {
    res.redirect("/");
  }

};

module.exports = {
  post
};