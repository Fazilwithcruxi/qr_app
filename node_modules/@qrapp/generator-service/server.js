const express = require('express');
const cors = require('cors');
require('dotenv').config();
const generateRoutes = require('./routes/generateRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/generate', generateRoutes);

const PORT = process.env.PORT || 4003;
app.listen(PORT, () => console.log(`Generator Service running on port ${PORT}`));
