const userWithPromise = getUserUsingPromises(1)
  .then((res) => {
    const { github } = res;
    return getRepositoriesUsingPromises(github);
  })
  .then((res) => getCommitsUsingPromises())
  .then(console.log);

function getUserUsingPromises(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.info('Reading user from the database!');
      resolve({ id, github: 'vyasriday' });
    });
  });
}

function getRepositoriesUsingPromises(username) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      console.info('Getting repositories from database!');
      resolve(['repo1', 'repo2']);
    });
  });
}

function getCommitsUsingPromises(repo) {
  return new Promise((resolve, reject) => {
    resolve('commits');
  });
}
