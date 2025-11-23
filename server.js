const http = require('http');

// Генерируем случайные настройки для плиты
function generateConfig() {
    return {
        moveInterval: (Math.random() * 1.5 + 0.5).toFixed(2), // 0.5 - 2.0
        moveDuration: (Math.random() * 0.7 + 0.3).toFixed(2), // 0.3 - 1.0
        moveDistance: (Math.random() * 0.4 + 0.1).toFixed(2), // 0.1 - 0.5
        shouldMoveDown: Math.random() > 0.5, // true = вниз, false = вверх
        isEnabled: true,
        timestamp: Date.now() // Уникальное значение каждый раз
    };
}

// Создаем сервер
const server = http.createServer((req, res) => {
    console.log('Request received:', req.url);

    // Разрешаем CORS (чтобы Unity мог делать запросы)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Обрабатываем preflight запросы
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // Отдаем конфиг по любому URL пути
    if (req.method === 'GET') {
        const config = generateConfig();

        res.setHeader('Content-Type', 'application/json');
        res.writeHead(200);
        res.end(JSON.stringify(config, null, 2));

        console.log('Config sent:', JSON.stringify(config, null, 2));
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Not Found' }));
    }
});

// Запускаем сервер
const PORT = process.env.PORT || 3000;
