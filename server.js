const http = require('http');

function generateConfig() {
   
    const minY = 0.75;    // Минимальная высота 
    const maxY = 1.063;  // Максимальная высота 

    const moveDistance = (Math.random() * 0.4 + 0.1).toFixed(2);
    const shouldMoveDown = Math.random() > 0.5;

    return {
        moveDuration: (Math.random() * 0.7 + 0.3).toFixed(2),
        moveDistance: parseFloat(moveDistance),
        shouldMoveDown: shouldMoveDown,
        isEnabled: true,
        minY: minY,
        maxY: maxY,
        timestamp: Date.now()
    };
}

const server = http.createServer((req, res) => {
    console.log('Request received:', req.url, req.method);

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    if (req.method === 'GET') {
        const config = generateConfig();

        res.setHeader('Content-Type', 'application/json');
        res.writeHead(200);
        res.end(JSON.stringify(config));

        console.log('Config sent:', JSON.stringify(config));
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Not Found' }));
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
    console.log('Server started with position limits!');
    console.log(`Port: ${PORT}`);
});