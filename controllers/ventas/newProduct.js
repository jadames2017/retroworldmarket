/////////////////////////////////////////////////////////////////
/// Función controladora para subir un nuevo producto a la BD ///
/////////////////////////////////////////////////////////////////

// Necesitamos conectarnos a la BD (getDB)
const getDB = require('../../ddbb/getDB.js');

// Importamos la función que hicimos para formatear fechas desde helpers.js:
const { formatDate } = require('../../helpers.js');

// Ahora creamos la función asíncrona newProduct:
const newProduct = async (req, res, next) => {
  // Primero: Solicitar una conexión con la DB (declaramos la variable vacía):
  let connection;

  try {
    // Establecer la conexión con la DB:
    connection = await getDB();

    // Qué solicitamos para subir un nuevo producto??
    // Respuesta:
    // idUser, brand, yearOfProduction, status, category, description, price, createdDate ,active

    // De todos los datos de la BD, al usuario SOLO le vamos a pedir:
    // idUser(***), nameProduct, brand, yearOfProduction, status, category, description y price.

    // (***) El idUser debemos obtenerlo del TOKEN, pero aún no hemos llegado a ese nivel...
    // así que vamos a hacer una trampita momentaneamente con el idUser, vamos a mandarlo
    // por el Body.

    // Obtenemos del Body (lo que nos envía el cliente en la REQUEST) los valores que
    // necesitamos con destructuring:
    const {
      idUser,
      nameProduct,
      brand,
      yearOfProduction,
      status,
      category,
      description,
      price,
    } = req.body;

    // Para confirmar que el usuario nos dé todos los datos que le pedimos, vamos a
    // hacer que si faltan datos se lance un error y creamos el status del error:
    if (
      !idUser ||
      !nameProduct ||
      !brand ||
      !yearOfProduction ||
      !status ||
      !category ||
      !description ||
      !price
    ) {
      // Creamos la variable error, le asignamos un status code y lanzamos el error.
      // Este error sera recogido por el CATCH, y enviado al Middleware de error en server.js
      // que lo administrará.
      const error = new Error('Falta algún campo');
      error.httpStatus = 400;
      throw error;
    }

    // Vamos a comprobar que el usuario ya exista en la BD (si no existe, no puede subir un producto):
    const [user] = await connection.query(
      `
        SELECT * FROM users WHERE id = ?
    `,
      [idUser]
    );
    // Si no existe lanzamos un mensaje de error:
    if (user.length < 1) {
      const error = new Error('El usuario seleccionado no existe');
      error.httpStatus = 400;
      throw error;
    }
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////
    // Si la acción llega hasta aquí es porque no hay errores, así que vamos a crear
    // la entrada en la tabla productos:

    // Para crear la entrada nos hace falta darle una fecha de creación (createdDate).
    // Y tenemos que requerir la función que formatea la fecha (formatDate) de helpers.js
    const createdDate = formatDate(new Date());
    //
    ////////////////////////////////////////////////////////////
    /// Ahora sí definitivamente creamos la entrada a la BD: ///
    ////////////////////////////////////////////////////////////
    await connection.query(
      `
        INSERT INTO products (idUser, nameProduct, brand, yearOfProduction, status, category, description, price, createdDate, active)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [
        idUser,
        nameProduct,
        brand,
        yearOfProduction,
        status,
        category,
        description,
        price,
        createdDate,
        true,
      ]
    );

    // Para confirmar si funciona: vamos a devolver (response) un OBJETO con status:200
    // y un mensaje de confirmación:
    res.send({
      status: 'Ok',
      message: 'El producto ha sido creado correctamente',
    });
  } catch (error) {
    next(error);

    res.send(error.message);
  } finally {
    // Pase lo que pase con la función, debemos liberar la conexión establecida:
    if (connection) connection.release();
  }
};

// Exportamos la función:
module.exports = newProduct;
