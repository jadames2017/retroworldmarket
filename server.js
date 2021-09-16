require('dotenv').config();

const express = require('express');

// Requerimos la dependencia morgan, que sirve, básicamente,  para registrar
// los detalles de las solicitudes al servidor. Es un "Logger".
const morgan = require('morgan');
const createUser = require('./controllers/users/createUser.js');

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

/**
 *
 * ***********************
 * **ENDPOINTS USUARIOS***
 * ***********************
 */

app.post('/users', createUser);

app.use((req, res) => {
  res.send('clarinete');
  console.log('vamos');
});
//////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////
/// Middleware de error ///
///////////////////////////

// Aquí llega si entra un "next(error)"
app -
  use((error, req, res, next) => {
    console.error(error);
    // Definimos el status de la respuesta al cliente: Si el error tiene un status code, lo
    // enviamos, sino le asignamos el code 500 (El servidor ha encontrado una situación que
    // no sabe cómo manejarla.)
    res.status(error.httpStatus || 500).send({
      status: 'error',
      message: error.message,
    });
  });

///////////////////////////////
/// Middleware de not found ///
///////////////////////////////

app.use((req, res) => {
  res.status(404).send({
    estatus: 'error',
    message: 'Not found',
  });
});

//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// Función para poner a funcionar el servido en el puerto dado: //
//////////////////////////////////////////////////////////////////
app.listen(PORT, () => {
  console.log(`Conectado al puerto: ${PORT}`);
});
