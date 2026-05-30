const express = require('express');
const connectDB = require('./db/connect');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());

// Swagger setup
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
const routes = require('./routes');

console.log(typeof routes); // Debugging line to check the type of routes

app.use('/api', routes);

// Error handler
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

// Connect to database and start server
const port = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDB();
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();  