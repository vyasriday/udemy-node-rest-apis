console.log(getUser());

async function getUser() {
  // async await works in try catch blocks
  try {
    const { github } = await getUserUsingPromises(1);
    console.log(github);
    const repos = await getRepositoriesUsingPromises(github);
    console.log(repos);
    const commits = await getCommitsUsingPromises(repos[0]);
    console.log(commits);
    return commits;
  } catch (e) {
    console.log('Error', e);
  }
}

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
