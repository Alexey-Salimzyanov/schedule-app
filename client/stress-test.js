const autocannon = require('autocannon');

const url = 'http://217.71.129.139:5079';  
const connections = 90;               
const duration = 20;                   

function run() {
  const instance = autocannon({
    url,
    connections,
    duration,
  });

  autocannon.track(instance);

  instance.on('done', (result) => {
    console.log('Stress test completed.');
    console.log('Requests:', result.requests.total);
    console.log('Latency (avg):', result.latency.average, 'ms');
    console.log('Throughput:', (result.throughput.average / 1024).toFixed(2), 'KB/s');
    console.log('Errors:', result.errors);
  });
}

run();
