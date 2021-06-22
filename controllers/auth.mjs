// db is an argument to this function so
// that we can make db queries inside
export default function initBugsController(db) {
  const checkIfLoggedIn = async (request, response) => {
    // login by default
    // response.cookie('loggedIn', true);

    // check for logged in cookie
    const cookieList = request.cookies;
    if (cookieList.loggedIn) {
      response.send(true);
    } else {
      response.send(false);
    }
  };

  // return all methods we define in an object
  // refer to the routes file above to see this used
  return {
    checkIfLoggedIn,
  };
}
