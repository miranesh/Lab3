const http = require('http');

function generateConfig() {
  return {
    moveInterval: (Math.random() * 1.5 + 0.5).toFixed(2),
    moveDuration: (Math.random() * 0.7 + 0.3).toFixed(2),
    moveDistance: (Math.random() * 0.4 + 0.1).toFixed(2),
    shouldMoveDown: Math.random() > 0.5,
    isEnabled: true,
    timestamp: Date.now()
  };
}

const server = http.createServer((req, res) => {
  console.log('Request received:', req.url, req.method);
  
  // Разрешаем CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  // Отдаем конфиг для любого GET запроса
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

// ВАЖНО: Используем порт из переменной окружения Render
const PORT = process.env.PORT || 3000;

server.listen(PORT, '0.0.0.0', () => {  // Добавил '0.0.0.0'
  console.log('Server started successfully!');
  console.log(`Port: ${PORT}`);
  console.log('Ready to accept requests');
});

// Обработка ошибок сервера
server.on('error', (error) => {
  console.error('❌ Server error:', error);
});

// Обработка graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});