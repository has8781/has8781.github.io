const swaggerUi = require('swagger-ui-express');
const swaggereJsdoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        info: {
            title: 'Public Data API',
            version: '3.0.0',
            description: '나만의 옷장 API',
        },
        host: '122.38.11.25:8080',
        basePath: '/'
    },
    apis: ['./swagger/*.js']
    // apis: ['./src/swagger/*.js']
};

const specs = swaggereJsdoc(options);

module.exports = {
    swaggerUi,
    specs
};