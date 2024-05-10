1-) Proporcione una explicación breve pero completa de las elecciones de diseño realizadas durante el proyecto:
2-) Incluya los motivos para seleccionar el sistema de base de datos elegido, las bibliotecas o marcos relevantes empleados y las decisiones arquitectónicas:

    He desarrollado dicho proyecto estructurando el código con clean architecture pensando en un crecimiento de módulos, cada módulo tiene
    n caso de usos justamente para dividir las funcionalidades y la lógica de negocio, cada módulo tiene un división de repositorios que es 
    donde está la lógica de acceso a datos básicamente los queries.

    Para mí lo explicado anteriormente resume un poco la parte mas importante de lo que es el proyecto, en la parte de infraestructure basicamente se utilizaria 
    para guardar los modelos de base de datos, pero podría usarse para agregar servicios externos como el guardado en la S3 la utilizacion de Firebase, básicamente 
    cualquier servicio externo.

    En el core esta todo lo relacionado al manejador de errores y la manera en como construir las respuestas de los servicios.

    Las razones para escoger mongo como base de datos, ha sido que básicamente al ser una base de datos no relacional, se podría mutar con el tiempo
    la información de cada colección (tabla) y tambien podría replicar relaciones entre colecciones, tambien he de decir que la libreria mongoose y el ODM
    ayudan de una manera más sencilla como popular la información de las relaciones, a nivel transaccional se pudiera para agregar eficiencia índices para una 
    búsqueda más eficiente.

    He elegido utilizar typescript para aprovechar las bondades de un lenguaje tipado, para cada libreria utilizada la verdad es que no he utilizado algo muy distinto a lo normal, mongoose-paginate-v2 es una libreria de paginados para mongoose.


Como correr el proyecto:

1-) Agregar el archivo .env:

    AVILA_TEK_DB=mongodb+srv://user:password@mongodb.net/
    PORT=8081
    NODE_ENV=development
    JWT_SECRET=holas12355
    ORIGINS=*

2-) Instalar las librerias
    npm install

3-) En el package.json he configurado para que con el siguiente comando se pueda correr el proyecto:
    npm start

En dicho proyecto he incluido el json de la colección de postman donde esta documentado los servicios desarrollados.


