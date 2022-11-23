const fromIndexFormRequestBody = (reqBody) => {
  delete(reqBody.submit);

  return {...reqBody};
};

module.exports = {
  fromIndexFormRequestBody
}