const {setTimeout:sleep} = require('timers/promises');
const report = (id, cost) => console.log(`#${id} task done, use ${cost} ms.\n`);

async function fakeAsync(id) {
  const delay = Math.round(Math.random() * 1000);
  await sleep(delay);
  report(id, delay);
  return delay;
}

module.exports = fakeAsync;
