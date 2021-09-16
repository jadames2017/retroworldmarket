    /////////////////
    /// ENDPOINTS ///
    /////////////////

    15/9 - Empezamos a desarrollar los Endpoints:

    	· POST /sellretro/ ----> Botón PUBLICAR (Terminado)
    	· POST /users/ ----> Botón ENVIAR en Pop-Up CREAR USUARIO (Terminado)

    16/9 -Siguientes Endpoints a desarrollar:

    	· GET /users/validate/:registrationCode -----> Validar un usuario recién registrado.
    	· POST /sellretro/:IDProduct -----> Botón EDITAR





    ENDPOINTS DE USUARIOS:
    -------------------------------------------------------------------------------------------------------------------------------

    · POST /users -----> Pop-Up REGISTRO. Botón ENVIAR. Crea un usuario pendiente de activar.

    	CABECERA DE AUTORIZACIÓN :	NO

    	BODY :
    		    · Nombre completo *
    		    · Nombre de Usuario (Alias) *
    		    · Avatar (Asignar uno por defecto) *
    		    · Email *
    		    · Contraseña *
    		    · Localidad *
    		    · Provincia *
    		    · Código Postal *

    	QUÉ RETORNA? :	Email que indica que el Usuario ha sido creado y que se debe activar la cuenta

    -------------------------------------------------------------------------------------------------------------------------------

    · GET /users/validate/:registrationCode -----> Validar un usuario recién registrado.

    	CABECERA DE AUTORIZACIÓN :	NO

    	QueryParam : registrationCode

    	QUÉ RETORNA? :	Mensaje que indica que el Usuario fue validado correctamente.

    -------------------------------------------------------------------------------------------------------------------------------

    · POST /users/login -----> Botón ENVIAR. Hacer login y retornar token

    	CABECERA DE AUTORIZACIÓN :	NO

    	BODY :  · Email
    		· Password

    	QUÉ RETORNA? :	Un token.

    -------------------------------------------------------------------------------------------------------------------------------

    · POST /users/:idUser -----> Botón editar Usuario

    	CABECERA DE AUTORIZACIÓN :	SI

    	QueryParam : idUser

    	Body :      · Nombre completo *
    		    · Nombre de Usuario (Alias) *
    		    · Avatar (Asignar uno por defecto) *
    		    · Email *
    		    · Contraseña *
    		    · Localidad *
    		    · Provincia *
    		    · Código Postal *

    	QUÉ RETORNA? :	Mensaje "Perfíl de Usuario modificado correctamente".



    -------------------------------------------------------------------------------------------------------------------------------
    · GET /users/:idUser -----> Obtener un usuario en concreto

    	CABECERA DE AUTORIZACIÓN :	SI

    	QueryParam : idUser

    	QUÉ RETORNA? :	Localización y valoración de un Usuario en concreto.

    -------------------------------------------------------------------------------------------------------------------------------

    ENDPOINTS DE Barra de Busqueda:

    -------------------------------------------------------------------------------------------------------------------------------

    · GET /products -----> Obtener los productos filtrados en la BARRA de BUSQUEDA

    	CABECERA DE AUTORIZACIÓN :	NO

    	BODY : queryString (Filtros de busqueda en la barra)

    	QUÉ RETORNA? :	Lista de productos que coinciden con los argumentos de busqueda.
    			(Delimitar las busquedas a los productos que tenemos)

    -------------------------------------------------------------------------------------------------------------------------------


    · GET /products/:IDCategories/ -----> Obtener CATEGORIAS de productos ordenadas por numeros.

    	CABECERA DE AUTORIZACIÓN : NO

    	QueryParams :  IDCategories

    	QUÉ RETORNA? :	La categoría seleccionada


    -------------------------------------------------------------------------------------------------------------------------------


    · GET /products/:IDCategories/ -----> Obtener productos filtrados por precios, ubicacion, etc..

    	CABECERA DE AUTORIZACIÓN : NO

    	QueryParams : IDCategories (Si hay seleccionadas categorías, sino Categories = 0)

    	BODY :  · Precio
    		· Ubicación
    		· Valoración de Vendedor
    		· Estado de funcionamiento del producto

    	QUÉ RETORNA? :	Lista de Productos filtrados.


    -------------------------------------------------------------------------------------------------------------------------------


    · GET /products/:IDProduct -----> Botón Solicitud de Reserva de Producto.

    	CABECERA DE AUTORIZACIÓN : SI

    	QueryParams :   · IDProduct

    	QUÉ RETORNA? :	Mensaje de Solicitud de Reserva realizada Correctamente



    -------------------------------------------------------------------------------------------------------------------------------

    · GET /products/:IDProduct -----> Botón Cancelar Solicitud (de Reserva de Producto).

    	CABECERA DE AUTORIZACIÓN : SI

    	QueryParams :   · IDProduct

    	QUÉ RETORNA? :	Mensaje de "Solicitud de Reserva CANCELADA Correctamente"



    -------------------------------------------------------------------------------------------------------------------------------




    ENDPOINTS DE VENTA:

    -------------------------------------------------------------------------------------------------------------------------------



    · DELETE /sellretro/:IDProduct -----> Botón Eliminar Retro

    	CABECERA DE AUTORIZACIÓN : SI

    	QueryParam :    · IDProduct


    	QUÉ RETORNA? :	Mensaje: "El producto fue ELIMINADO CORRECTAMENTE"




    -------------------------------------------------------------------------------------------------------------------------------

    · POST /sellretro/-----> Botón PUBLICAR

    	CABECERA DE AUTORIZACIÓN : SI

    	Body :	 · Nombre del producto *
    			 · Marca *
    			 · Año de Fabricación *
    			 · Estado de funcionamiento (Nº del 1-5) *
    			 · Categoría (Nº entre 0-5) *
    			 · Descripción *
    			 · Precio *

    	QUÉ RETORNA? :	Mensaje "Producto publicado correctamente"
    			Publicación del producto.

    -------------------------------------------------------------------------------------------------------------------------------

    · POST /sellretro/:IDProduct -----> Botón EDITAR

    	CABECERA DE AUTORIZACIÓN : SI

    	QueryParam :    · IDProduct

    	Body :	· Mensaje

    	QUÉ RETORNA? :	Mensaje con la información del producto actualizada.

    -------------------------------------------------------------------------------------------------------------------------------

    · GET /sellretro/:IDProduct -----> Botón RETRO VENDIDO

    	CABECERA DE AUTORIZACIÓN : SI

    	QueryParam :    · IDProduct

    	QUÉ RETORNA? :	Desactiva el Producto para otros usuarios
    			Mensaje: "Producto Vendido correctamente".

    -------------------------------------------------------------------------------------------------------------------------------

    ENDPOINTS DE BUZÓN DE MENSAJES:

    -------------------------------------------------------------------------------------------------------------------------------

    · GET /menssages/:IDProduct -----> Botón "MOSTRAR mensajes"

    	CABECERA DE AUTORIZACIÓN : SI

    	QueryParam :    · IDProduct

    	QUÉ RETORNA? :	Historial de Mensajes

    -------------------------------------------------------------------------------------------------------------------------------

    · GET /messages/:IDProduct -----> Botón ENVIAR/ --> Envía el mensaje al destinatario.

    	CABECERA DE AUTORIZACIÓN : SI

    	QueryParam :    · IDProduct

    	QUÉ RETORNA? :

    -------------------------------------------------------------------------------------------------------------------------------

    · GET /messages/:IDProduct -----> Botón

    	CABECERA DE AUTORIZACIÓN : SI

    	QueryParam :    · IDProduct

    	QUÉ RETORNA? :

    -------------------------------------------------------------------------------------------------------------------------------

    · POST /messages/:IDProduct -----> Botón Mensaje con el Vendedor

    	CABECERA DE AUTORIZACIÓN : SI

    	QueryParam :    · IDProduct

    	Body :	· Mensaje

    	QUÉ RETORNA? :	Mensaje de "Mensaje enviado correctamente"



    -------------------------------------------------------------------------------------------------------------------------------

    · POST /messages/:IDProduct -----> Botón ACEPTAR RESERVA

    	CABECERA DE AUTORIZACIÓN : SI

    	QueryParam :    · IDProduct

    	Body: 	· IDUsuario (Comprador)

    	QUÉ RETORNA? :	Mensaje "Producto RESERVADO correctamente"

    -------------------------------------------------------------------------------------------------------------------------------

## --Página catálogo--(Pop-Up)

/Botón siguiente y anterior/-->Siguiente y anterior página. -----> PENDIENTE

## --Página de producto--(Pop-Up)

/Botón siguiente y anterior/--> Siguiente y anterior producto.

## --Buzón de mensajes--(Pop-Up)

/MENSAJES CON EL VENDEDOR/Botón ELIMINAR MENSAJE CON EL VENDEDOR/ --> Elimina los mensajes existentes con el usuario. -----> Para cuando haya tiempo ----- Preguntar a David.

/RECHAZAR RESERVA/ --> El producto vuelve a estár DISPONIBLE para los usuarios. ----------------- PREGUNTARLE A DAVID!!!!!!!!!!

## --Perfil de usuario-------> POP UP

/Cerrar Sesión/--> Cerrar sesión de usuario actual. ---------------------Preguntarle a David si va en el Front o Back-end
