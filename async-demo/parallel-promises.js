// promise 1
const p1 = new Promise((resolve, _) => {
  setTimeout(() => {
    resolve('Facebook Promise!!!');
  }, 2000);
});

// promise 2
const p2 = new Promise((resolve, _) => {
  setTimeout(() => {
    resolve('Twitter Promise!!!');
  }, 4000);
});

// return a promise when all the promises are settled. The result is an array
Promise.all([p1, p2]).then(console.log);

//  the value is whicheerv promise is settled first
Promise.race([p1, p2]).then(console.log);
