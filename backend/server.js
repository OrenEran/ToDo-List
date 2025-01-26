const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const seedCategories = require('./seed/categories');

dotenv.config();

// app config
const app = express();
const port = process.env.PORT || 8000;
const connectionURL = process.env.MONGO_URI;

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173', // Local development
  'https://to-do-list-chi-wine.vercel.app', // Production
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like Postman or server-to-server calls)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true, // Support cookies or other credentials
}));

// Middlewares
app.use(express.json()); // Convert incoming requests to JSON

// Use the defined routes from the separate route files
app.use('/api', authRoutes);
app.use('/api', todoRoutes); 
app.use('/api', categoryRoutes);

// DB Config
mongoose.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => console.log(`Connected to MongoDB, running on port: ${port}`));
    seedCategories();
  })
  .catch((err) => {
    console.error('Connection error:', err);
  });
