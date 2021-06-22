// SELECTORS
const selectBugFormBtn = document.querySelector('.bug-form-btn');
const selectBugFormParentDiv = document.querySelector('.bug-form-section');
const selectBugCounter = document.querySelector('.number-of-bugs');
const selectBugsParentDiv = document.querySelector('.bug-list');

// HELPER FUNCTIONS
const buildBugsList = (allBugs, numberOfBugs) => {
  console.log('Building...');
  // Remove previous list if exist
  if (selectBugsParentDiv.hasChildNodes()) {
    console.log('removing...');

    while (selectBugsParentDiv.firstChild) {
      selectBugsParentDiv.removeChild(selectBugsParentDiv.firstChild);
    }
  }
  console.log('Building!');
  // create div for each bug
  for (let i = 0; i < numberOfBugs; i += 1) {
    // get single bug data
    const singleBug = allBugs[i];

    // create div
    const singleBugDiv = document.createElement('div');
    singleBugDiv.classList.add('bug-list-single-bug');
    selectBugsParentDiv.appendChild(singleBugDiv);

    // create display
    const problemText = document.createElement('p');
    problemText.innerHTML = `Problem: ${singleBug.problem}`;
    singleBugDiv.appendChild(problemText);

    const errorText = document.createElement('p');
    errorText.innerHTML = `Error Text: ${singleBug.errorText}`;
    singleBugDiv.appendChild(errorText);

    const commitText = document.createElement('p');
    commitText.innerHTML = `Commit: ${singleBug.commit}`;
    singleBugDiv.appendChild(commitText);

    const featureText = document.createElement('p');
    featureText.innerHTML = `Feature Id: ${singleBug.featureId}`;
    singleBugDiv.appendChild(featureText);
  }
};

const updateBugsListInDataBase = async (formData) => {
  try {
    // update form data
    console.log('Updating DB!');
    await axios.post('/api/bugs', formData);
  } catch (error) {
    console.error('Error in updateBugsListInDataBase', error);
  }
};

const refreshBugsListOnPage = async () => {
  try {
    // get bug data
    const { data: { allBugs } } = await axios.get('/api/bugs');

    // get number of bugs
    const numberOfBugs = allBugs.length;

    console.log('ALL BUGS');
    console.log(`Num of bugs: ${numberOfBugs}`);
    console.log(allBugs);

    // change bug counter
    selectBugCounter.innerHTML = numberOfBugs;

    // build bugs list
    await buildBugsList(allBugs, numberOfBugs);
    console.log('Built!!');
  } catch (error) {
    console.error('Error in updateBugsListInDatabase', error);
  }
};

const generatBugReportForm = async () => {
  // // create form
  const form = document.createElement('div');
  form.classList.add('bug-report-form');
  selectBugFormParentDiv.appendChild(form);

  // input element, problem
  const problem = document.createElement('input');
  problem.setAttribute('type', 'text');
  problem.setAttribute('placeholder', 'Description of problem');
  problem.setAttribute('id', 'form-input-problem');
  form.appendChild(problem);

  // input element, error_text
  const errorText = document.createElement('input');
  errorText.setAttribute('type', 'text');
  errorText.setAttribute('id', 'form-input-error-text');
  errorText.setAttribute('placeholder', 'Error output text, if any');
  form.appendChild(errorText);

  // input element, commit
  const commit = document.createElement('input');
  commit.setAttribute('type', 'text');
  commit.setAttribute('placeholder', 'Git commit hash of solution');
  commit.setAttribute('id', 'form-input-commit');
  form.appendChild(commit);

  // features list
  const featuresList = document.createElement('select');
  featuresList.setAttribute('id', 'form-input-feature-id');
  form.appendChild(featuresList);

  // get all features
  try {
    const { data: { allFeatures } } = await axios.get('/api/features');
    const numberOfFeatures = allFeatures.length;
    for (let i = 0; i < numberOfFeatures; i += 1) {
      const feature = allFeatures[i];
      const featureOption = document.createElement('option');
      featureOption.setAttribute('value', feature.id);
      featureOption.innerHTML = `${feature.name}`;
      featuresList.appendChild(featureOption);
    }
  } catch (error) {
    console.error('Could not get features', error);
  }

  // submit button
  const submitBtn = document.createElement('button');
  submitBtn.innerHTML = 'Submit Bug';
  submitBtn.classList.add('bug-form-submit-btn');
  form.appendChild(submitBtn);
};

const tellUserToLogIn = () => {
  // input element
  const message = document.createElement('p');
  message.innerHTML = 'You need to log in!';
  selectBugFormParentDiv.appendChild(message);
};

// EVENT LISTENER
selectBugFormBtn.addEventListener('click', async () => {
  // check if user is logged in
  const { data: isLoggedIn } = await axios.get('/auth');
  if (!isLoggedIn) {
    // if user is not logged in
    tellUserToLogIn();
  // if user is  logged in
  } else {
  // generate form
    await generatBugReportForm();

    // create event listener for bug submit button
    const submitBtn = document.querySelector('.bug-form-submit-btn');

    submitBtn.addEventListener('click', async () => {
    // get form data
      const formData = {
        problem: document.getElementById('form-input-problem').value,
        errorText: document.getElementById('form-input-error-text').value,
        commit: document.getElementById('form-input-commit').value,
        featureId: Number(document.getElementById('form-input-feature-id').value),
      };

      // update and refresh
      // updateAndRefreshBugsList(formData);
      await updateBugsListInDataBase(formData);
      await refreshBugsListOnPage();
    });
  }
});

// When the page loads, retrieve the list of bugs and render them onto the page.
refreshBugsListOnPage();
