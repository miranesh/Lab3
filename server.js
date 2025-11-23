const express = require('express');
const app = express();

app.get('/config.json', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.json({
        moveInterval: (Math.random() * 1.5 + 0.5).toFixed(2),
        moveDuration: (Math.random() * 0.7 + 0.3).toFixed(2),
        moveDistance: (Math.random() * 0.4 + 0.1).toFixed(2),
        shouldMoveDown: Math.random() > 0.5,
        isEnabled: true
    });
});

app.listen(3000);