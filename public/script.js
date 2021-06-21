// selectors
const selectBugFormBtn = document.querySelector('.bug-form-btn');
const selectBugFormParentDiv = document.querySelector('.bug-form-section');
const selectBugCounter = document.querySelector('.number-of-bugs');
const selectBugsParentDiv = document.querySelector('.bug-list');

const refreshBugList = async () => {
  console.log('REFRESHED!');

  try {
    // get bug data
    const { data: { allBugs } } = await axios.get('/api/bugs');
    // get number of bugs
    const numberOfBugs = allBugs.length;
    // change bug counter
    selectBugCounter.innerHTML = numberOfBugs;

    // create div for each bug
    for (let i = 0; i < numberOfBugs; i += 1) {
      // get single bug data
      const singleBug = allBugs[i];
      console.log(singleBug);

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
  } catch (error) {
    console.error(error);
  }
};

const generatBugReportForm = async () => {
  // create form
  const form = document.createElement('form');
  form.setAttribute('method', 'post');
  form.setAttribute('action', '/api/bugs');
  form.setAttribute('id', 'bug-report-form');
  form.classList.add('bug-report-form');
  selectBugFormParentDiv.appendChild(form);

  // input element, problem
  const problem = document.createElement('input');
  problem.setAttribute('type', 'text');
  problem.setAttribute('placeholder', 'Description of problem');
  problem.setAttribute('name', 'problem');
  form.appendChild(problem);

  // input element, error_text
  const errorText = document.createElement('input');
  errorText.setAttribute('type', 'text');
  errorText.setAttribute('placeholder', 'Error output text, if any');
  errorText.setAttribute('name', 'error_text');
  form.appendChild(errorText);

  // input element, commit
  const commit = document.createElement('input');
  commit.setAttribute('type', 'text');
  commit.setAttribute('placeholder', 'Git commit hash of solution');
  commit.setAttribute('name', 'commit');
  form.appendChild(commit);

  // features list
  const featuresList = document.createElement('select');
  featuresList.setAttribute('id', 'feature_id');
  featuresList.setAttribute('name', 'feature_id');
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
  const submitBtn = document.createElement('input');
  submitBtn.setAttribute('type', 'submit');
  submitBtn.setAttribute('value', 'Submit');
  form.appendChild(submitBtn);
  // create event listener for bugs list to refresh once form is submitted (This does NOT work)
  submitBtn.addEventListener('click', () => {
    // use set timeout so that bug will be added to db before ajax
    setTimeout(() => { refreshBugList(); }, 0);
  });
};

// event listener
selectBugFormBtn.addEventListener('click', generatBugReportForm);
