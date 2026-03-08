const express = require('express');
const cors = require('cors');
require('dotenv').config();
const proxy = require('express-http-proxy');

const app = express();
app.use(cors());

// Healthcheck
app.get('/health', (req, res) => res.send('OK'));

app.use('/api/auth', proxy(process.env.AUTH_URL || 'http://localhost:4001'));
app.use('/api/products', proxy(process.env.PRODUCT_URL || 'http://localhost:4002'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));
