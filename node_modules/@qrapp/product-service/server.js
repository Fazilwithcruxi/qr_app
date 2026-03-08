const express = require('express');
const cors = require('cors');
require('dotenv').config();
const productRoutes = require('./routes/productRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', productRoutes);

const PORT = process.env.PORT || 4002;
app.listen(PORT, () => console.log(`Product Service running on port ${PORT}`));
