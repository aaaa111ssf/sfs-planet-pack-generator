const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    const filePath = path.join('/workspace', req.url === '/' ? '/sfs-planet-pack-generator.html' : decodeURIComponent(req.url));
    const ext = path.extname(filePath).toLowerCase();
    const contentTypes = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.json': 'application/json' };

    fs.readFile(filePath, (err, data) => {
        if (err) { res.writeHead(404); res.end('Not found'); return; }
        res.writeHead(200, { 'Content-Type': contentTypes[ext] || 'text/plain', 'Access-Control-Allow-Origin': '*' });
        res.end(data);
    });
});

server.listen(8080, '0.0.0.0', () => console.log('Server running at http://0.0.0.0:8080/'));
