var fs = require('fs');
const axios = require('axios');
const path = require('path');
const csvParser = require('csv-parser');

const { workerData, parentPort } = require('worker_threads');


