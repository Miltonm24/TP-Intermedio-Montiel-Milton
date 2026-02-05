require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/error');

// Importar rutas
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

// Conectar a la base de datos
connectDB();

// Inicializar Express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Servir archivos estáticos
app.use(express.static('public'));

// Importar rutas de vistas
const viewRoutes = require('./routes/views');

// Montar rutas de vistas (ANTES de las rutas de API)
app.use('/', viewRoutes);

// Montar rutas de API
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Middleware de manejo de errores (debe ir al final)
app.use(errorHandler);

// Puerto
const PORT = process.env.PORT || 5000;

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT} en modo ${process.env.NODE_ENV}`);
});
