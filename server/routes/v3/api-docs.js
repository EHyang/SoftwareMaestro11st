const express = require('express');
const router = express.Router();
const path = require('path');

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');


const options = {
    swaggerDefinition: {
        info: {
            title: 'Swagger API Docs',
            version: '1.0.0',
            description: ' Swagger test document ',
        },
        host: '3.34.117.4:3001',
        basePath: '/api/v3'
    },
    apis: [path.resolve(__dirname, "./*.js")]
};

const specs = swaggerJsdoc(options);
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

module.exports = router;