const log = console.log;

function fakeAsync(id) {
  const start = Date.now(),
        delay = Math.random() * 1000;

  return new Promise((resolve, reject) => {
    setTimeout(function() {
      const end = Date.now();
      console.log('fakeAsync use %dms', end-start);
      report(id, end-start);
      resolve(end-start);
    }, delay);
  });
}

function report(id, cost) {
  console.log(`#${id} task done. use ${cost} ms.\n`);
}

module.exports = fakeAsync;
