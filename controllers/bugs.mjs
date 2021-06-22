// db is an argument to this function so
// that we can make db queries inside
export default function initBugsController(db) {
  const apiIndexBugs = async (request, response) => {
    try {
      // get all features
      const allBugs = await db.Bug.findAll();
      // send data to link
      response.send({ allBugs });
    } catch (error) {
      console.error('!initBugsController.apiIndexBugs Error', error);
    }
  };

  const create = async (request, response, next) => {
    // get data
    const {
      problem,
      errorText,
      commit,
      featureId,
    } = request.body;
    try {
      // add bug to DB
      await db.Bug.create({
        problem,
        errorText,
        commit,
        featureId,
      });
      console.log('Updated DB!');
      // NEEDED TO USE THIS!
      response.end();
    } catch (error) {
      console.error('!initBugsController.create Error', error);
    }
  };

  // return all methods we define in an object
  // refer to the routes file above to see this used
  return {
    apiIndexBugs,
    create,
  };
}
