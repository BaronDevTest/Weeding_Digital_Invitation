const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/static', express.static(path.join(__dirname, 'static'), {
  etag: true,
  lastModified: true,
  setHeaders: (res, filePath) => {
    res.setHeader('Accept-Ranges', 'bytes');
    if (/\.(js|css|html|json)$/i.test(filePath)) {
      // Cod sursa care se schimba la fiecare deploy: cache scurt + revalidare
      // -> userul vede modificari in max 5 minute fara hard refresh
      res.setHeader('Cache-Control', 'public, max-age=300, must-revalidate');
    } else if (/\.(mp4|webm|jpe?g|png|webp|gif|avif|svg|ico|woff2?)$/i.test(filePath)) {
      // Assets grele (video / imagini / fonturi): cache lung, rar schimbate
      res.setHeader('Cache-Control', 'public, max-age=2592000, immutable');
    } else {
      // Default rezonabil pentru orice altceva
      res.setHeader('Cache-Control', 'public, max-age=3600');
    }
  }
}));

app.get('/healthz', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/', (req, res) => {
  // HTML-ul nu se cache-uieste — sa ia mereu ultima versiune
  res.setHeader('Cache-Control', 'no-cache, must-revalidate');
  res.sendFile(path.join(__dirname, 'templates', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
