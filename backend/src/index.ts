import express, { Request, Response } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";
import apiRoutes from "./routes/api.routes";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import medicoRoutes from './routes/MedicoRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Conexion con la BDD
// Cargar variables de entorno
dotenv.config();

// URI de conexión desde el archivo .env
const mongoUri: string | undefined = process.env.MONGO_URI;

if (!mongoUri) {
  console.error('❌ No se encontró la variable MONGO_URI en el archivo .env');
  process.exit(1); // Sale de la aplicación
}

// Conectar a MongoDB
mongoose.connect(mongoUri)
  .then(() => {
    console.log('✅ Conectado a MongoDB');
  })
  .catch((err: Error) => {
    console.error('❌ Error de conexión a MongoDB:', err.message);
    process.exit(1); // Sale de la aplicación si falla la conexión
  });

mongoose.connection.on('connected', async () => {
  const collections = await mongoose.connection.db.listCollections().toArray();
  console.log('📁 Colecciones disponibles:', collections.map(c => c.name));
});

mongoose.connection.on('connected', () => {
  console.log(`✅ Conectado a la base: ${mongoose.connection.db.databaseName}`);
});
// Rutas

app.get("/", (req: Request, res: Response) => {
    res.send("¡Hola Mundo con Express + TypeScript + Swagger!");
});

app.use("/api", apiRoutes);
app.use(medicoRoutes);

// Swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`Documentación en http://localhost:${PORT}/api-docs`);
});
