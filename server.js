const express = require('express');
const connectDB = require('./db/connect');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const errorHandler = require('./middleware/errorHandler');

require('dotenv').config();

// Load passport config
require('./config/passport')(passport);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'fallback_secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Swagger setup
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger.js');

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
  }),
);

// Auth routes
const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

// Routes
const userRoutes = require('./userRoutes');
const itemRoutes = require('./itemRoutes');

console.log(typeof userRoutes); // Debugging line to check the type of userRoutes

app.use('/api/users', userRoutes);
app.use('/api/items', itemRoutes);

// Fallback 404 handler
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status = 404;
  next(error);
});

// Error handler
app.use(errorHandler);

// Connect to database and start server
const port = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDB();
        app.listen(port, () => {
            console.log(`Server is running in ${process.env.NODE_ENV} || development mode on port ${port}`);
        });
    } catch (err) {
        console.error('Database connection falied:', err);
    }
};

start();  