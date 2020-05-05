const userWithCallback = getUserUsingCallback(1, function (response) {
  const { github } = response;
  getRepositoriesUsingCallback(github, function (repos) {
    getCommits(repo, function (commits) {
      console.log(commits);
    });
    // now if we want some info for each repo we need to call one more function here and pass it repo and callback. and that's how we het callback hell
  });
});

// get users function
function getUserUsingCallback(id, callback) {
  setTimeout(() => {
    console.log('Reading from the database...');
    callback({ id, github: 'vyasriday' });
  });
}
// get repositories function
function getRepositoriesUsingCallback(username, callback) {
  setTimeout(() => {
    console.info('Getting repositories...');
    callback(['repo1', 'repo2']);
  }, 2000);
}

// get commits function

function getCommits(repo, callback) {
  // gets commits and then calls the callback and passed the commits to it
}

console.log('This code will be executed at the very first!!!');
