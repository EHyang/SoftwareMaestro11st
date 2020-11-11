const express = require('express');
const router = express.Router();
const path = require('path');

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');


const options = {
    swaggerDefinition: {
        info: {
            title: '닿다 API Docs',
            version: '1.0.0',
            description: 'API Specification of Dahda service. See below api list for detailed use.',
        },
        host: '3.34.117.4:3000',
        basePath: '/api/v3'
    },
    apis: [path.resolve(__dirname, "./*.js")]
};

const specs = swaggerJsdoc(options);
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

module.exports = router;
