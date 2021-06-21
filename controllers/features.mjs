// db is an argument to this function so
// that we can make db queries inside
export default function initFeaturesController(db) {
  const apiIndexFeatures = async (request, response) => {
    try {
      // get all features
      const allFeatures = await db.Feature.findAll();
      // send data to link
      response.send({ allFeatures });
    } catch (error) {
      console.error('!initFeaturesController.apiIndexFeatures Error', error);
    }
  };

  // return all methods we define in an object
  // refer to the routes file above to see this used
  return {
    apiIndexFeatures,
  };
}
