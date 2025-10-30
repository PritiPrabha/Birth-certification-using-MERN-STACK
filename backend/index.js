const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Hardcoded Environment Variables
const MONGO_URI = 'mongodb://127.0.0.1:27017/brith';
const PORT = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error(err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/applications', require('./routes/applications'));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/certificate', require('./routes/certificate'));
app.use('/api/users', require('./routes/users'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
