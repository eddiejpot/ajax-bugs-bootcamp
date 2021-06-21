import db from './models/index.mjs';

// import your controllers here
import initBugsController from './controllers/bugs.mjs';
import initFeaturesController from './controllers/features.mjs';

export default function bindRoutes(app) {
  // initialize the controller functions here
  // pass in the db for all callbacks

  const bugsController = initBugsController(db);
  const featuresController = initFeaturesController(db);

  // apis
  app.get('/api/features', featuresController.apiIndexFeatures);
  app.get('/api/bugs', bugsController.apiIndexBugs);
  app.post('/api/bugs', bugsController.create);

  // define your route matchers here using app
  // index
  app.get('/', (resquest, response) => {
    response.render('index');
  });
}
