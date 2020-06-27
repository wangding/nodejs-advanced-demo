function bigTask(id) {
  const start = Date.now(),
        _id   = id || 1;
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      const end = Date.now();

      report(_id, end-start);
      resolve();
    }, 100);
  });
}

function report(id, cost) {
  console.log(`#${id} task done. use ${cost} ms.`);
}

module.exports = bigTask;
