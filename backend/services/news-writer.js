const fs = require('fs');
const { workerData, parentPort } = require('worker_threads')

// You can do any heavy stuff here, in a synchronous way
// without blocking the "main thread"

fs.writeFileSync('./data/news-data.json', JSON.stringify(workerData))


parentPort.postMessage({ message: 'File successfully written to.' })