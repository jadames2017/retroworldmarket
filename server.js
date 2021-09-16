require('dotenv').config();

const express = require('express');

// Requerimos la dependencia morgan, que sirve, básicamente,  para registrar
// los detalles de las solicitudes al servidor. Es un "Logger".
const morgan = require('morgan');

const { PORT } = process.env;

const app = express();

// Usamos morgan como "Logger":
app.use(morgan('dev'));

// La información de las Request nos llegan a través del Body y, necesariamente,
// tenemos que ¡¡¡¡¡DESERIALIZARLO!!!!! Para ello usamos el método json de express:
// ** (Como las peticiones vendrán en las líneas siguientes, ya estarán deserializadas.)
app.use(express.json());

/////////////////////////////////////////////////////////////////////////////////
// Aquí IMPORTAREMOS las funciones controladoras desde la carpeta CONTROLERS: ///
/////////////////////////////////////////////////////////////////////////////////
const newProduct = require('./controllers/ventas/newProduct.js');

/////////////////////
///// ENDPOINTS /////
/////////////////////

// Endpoint para subir un producto:
//  POST /sellretro/-----> Botón PUBLICAR
//      POST /sellretro-----> Esta es la función CONTROLADORA. La función estará definida
//      en la carpeta CONTROLLERS para hacer el código más limpio y organizado:
app.post('/sellretro', newProduct);

app.use((req, res) => {
  res.send('clarinete');
  console.log('vamos');
});

app.use((req, res) => {
  res.status(404).send({
    estatus: 'error',
    message: 'Not found',
  });
});

// Función para poner a funcionar el servido en el puerto dado:
app.listen(PORT, () => {
  console.log(`Conectado al puerto: ${PORT}`);
});
