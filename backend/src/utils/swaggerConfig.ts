const swaggerJsDoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API de TurnosYa",
            version: "1.0.0",
            description: "Documentación de la API con autenticación JWT",
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ["./src/routes/*.ts"], // Ajustá esta ruta a donde tengas tus rutas
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;
