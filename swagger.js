const swaggerJSDoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Express API with Swagger',
            version: '1.0.0',
            description: 'API documentation for Users and Items'
        },
        servers: [
            {
                url: 'http://localhost:5000/api',
                description: 'Development server'
            },
        ],
    },
    apis: ['./routes/*.js' ,], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);

console.log(JSON.stringify(swaggerSpec, null, 2));

module.exports = swaggerSpec; 
                