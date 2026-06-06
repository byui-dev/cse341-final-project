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
                url: 'http://localhost:5000',
                description: 'Development server'
            },
        ],
        // New structural configuration code for components
        components: {
            securitySchemes: {
                cookieAuth: {
                    type: 'apiKey',
                    in: 'cookie',
                    name: 'connect.sid',
                    description: 'Session cookie for authentication'
                }
            },
            schemas: {
                UserBody: {
                    type: 'object',
                    required: ['firstName', 'lastName', 'email'],
                    properties: {
                        firstName: { type: 'string', example: 'Harriet' },
                        lastName: { type: 'string', example: 'Smith' },
                        email: { type: 'string', format: 'email', example: 'harriet.smith@gmail.com ' }
                    },
                    ItemBody: {
                        type: 'object',
                        required: ['name', 'price', 'category'],
                        properties: {
                            name: { type: 'string', example: 'Wireless Mouse' },
                            description: { type: 'string', example: 'A high-precision wireless mouse with ergonomic design.' },
                            price: { type: 'number', format: 'float', example: 29.99 },
                            category: { type: 'string', example: 'Electronics' },
                        }
                    },
                    ErrorResponse: {
                        type: 'object',
                        properties: {
                            status: { type: 'integer', example: 400 },
                            message: { type: 'string', example: 'Error message describing the issue' }
                        }
                    }
                }
            }
        },
    },
    apis: ['./routes/*.js'], // Path to the API route files
};    

const swaggerSpec = swaggerJSDoc(options);



module.exports = swaggerSpec; 
