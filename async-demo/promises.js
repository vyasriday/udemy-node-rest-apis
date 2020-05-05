const p = new Promise((resolve, reject) => {
  setTimeout(function () {
    resolve(12);
  }, 1000);
});

p.then(console.log);

console.log('I am executed at first!!!');
