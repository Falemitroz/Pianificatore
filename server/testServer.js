const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Server è in esecuzione');
});

server.listen(5001, () => {
  console.log('Server in esecuzione su http://localhost:5001');
});
