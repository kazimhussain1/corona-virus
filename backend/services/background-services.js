const { Worker } = require('worker_threads');

class BackgroundServices {
  runNewsWriterService = workerData => {
    return new Promise((resolve, reject) => {
      const worker = new Worker('./services/news-writer.js', { workerData });
      worker.on('message', resolve);
      worker.on('error', reject);
      worker.on('exit', code => {
        if (code !== 0)
          reject(new Error(`Worker stopped with exit code ${code}`));
      });
    });
  };

  runVirusDataWriterService = () => {
    return new Promise((resolve, reject) => {
      const worker = new Worker('./services/git-writer.js', {});
      worker.on('message', resolve);
      worker.on('error', reject);
      worker.on('exit', code => {
        if (code !== 0)
          reject(new Error(`Worker stopped with exit code ${code}`));
      });
    });
  };


  runTimeSeriesWriterService = () => {
    return new Promise((resolve, reject) => {
      const worker = new Worker('./services/time-series-fetcher.js', {});
      worker.on('message', resolve);
      worker.on('error', reject);
      worker.on('exit', code => {
        if (code !== 0)
          reject(new Error(`Worker stopped with exit code ${code}`));
      });
    });
  };
}

module.exports.BackgroundServices = BackgroundServices;
