// SELECTORS
const selectBugFormBtn = document.querySelector('.bug-form-btn');
const selectBugFormParentDiv = document.querySelector('.bug-form-section');
const selectBugCounter = document.querySelector('.number-of-bugs');
const selectBugsParentDiv = document.querySelector('.bug-list');

// HELPER FUNCTIONS
const buildBugsList = (allBugs, numberOfBugs) => {
  console.log('Building...');
  // Remove previous list if exist
  const divToRemove = document.getElementsByClassName('bug-list-single-bug');
  if (divToRemove.length > 0) {
    console.log('removing...');
    divToRemove[0].remove();
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

const updateAndRefreshBugsList = async (formData) => {
  try {
    // update form data
    console.log('Updating DB!');
    console.log(formData);
    const post = await axios.post('/api/bugs', formData);
    console.log(post);

    console.log('Updated!');
    // CODE STOPS RUNNING HERE

    // get bug data
    console.log('Refreshing Bugs List');
    const { data: { allBugs } } = await axios.get('/api/bugs');
    // get number of bugs
    const numberOfBugs = allBugs.length;
    console.log('LETS SEE THE BUGS!');
    console.log(allBugs);
    // change bug counter
    selectBugCounter.innerHTML = numberOfBugs;

    console.log('Building Bug list!');

    // build bugs list
    await buildBugsList(allBugs, numberOfBugs);

    console.log('Refreshed!');
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

// EVENT LISTENER
selectBugFormBtn.addEventListener('click', async () => {
  await generatBugReportForm();

  // create event listener for bug submit button
  const submitBtn = document.querySelector('.bug-form-submit-btn');

  submitBtn.addEventListener('click', () => {
    // get form data
    const formData = {
      problem: document.getElementById('form-input-problem').value,
      errorText: document.getElementById('form-input-error-text').value,
      commit: document.getElementById('form-input-commit').value,
      featureId: Number(document.getElementById('form-input-feature-id').value),
    };

    // update and refresh
    updateAndRefreshBugsList(formData);
  });
});
