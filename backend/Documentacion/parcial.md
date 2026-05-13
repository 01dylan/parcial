# Parcial - Base de Datos y Backend
**Estudiante:** Dilan Duvan Avila Fuentes  
**Proyecto:** Cars y Tuitions  
**Motores:** PostgreSQL y MySQL

---

## Tabla de Contenido
1. [Cars](#1-cars)
2. [Tuitions](#2-tuitions)

---

## 1. Cars

### Modelo

Para este modelo defini los campos que pide el diagrama, le agregue las validaciones para que no se puedan ingresar datos incorrectos, por ejemplo la clase solo acepta los valores que yo defini y el modelo del carro no puede ser menor a 1900.

```typescript
export const Car = sequelize.define("CARS", {
  car_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  marca: { type: DataTypes.STRING, allowNull: false },
  clase: { type: DataTypes.STRING, allowNull: false },
  modelo: { type: DataTypes.INTEGER, allowNull: false },
  cilindraje: { type: DataTypes.FLOAT, allowNull: false },
  capacidad: { type: DataTypes.INTEGER, allowNull: false }
});
```

![Modelo Car](./img/modelo_car.png)

### Controlador

El controlador tiene los 5 metodos del CRUD, tambien le agregue el manejo de errores para que cuando se envie un dato incorrecto salga el mensaje de la validacion y no un error generico.

![Controlador Car](./img/car_controller.png)

### Rutas

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/cars` | trae todos los carros |
| GET | `/api/cars/:id` | trae un carro por id |
| POST | `/api/cars` | crea un carro |
| PUT | `/api/cars/:id` | actualiza un carro |
| DELETE | `/api/cars/:id` | elimina un carro |

![Rutas Car](./img/car_routes.png)

### Configuracion .env

Aqui configure las variables de entorno para conectarme tanto a postgres como a mysql, solo cambiando el DB_ENGINE puedo cambiar de motor.

![env](./img/.env.png)

### Creacion de la tabla en PostgreSQL

Sequelize crea la tabla automaticamente cuando se inicia el servidor con sync.

![Creacion tabla PostgreSQL](./img/creacion_postgres.png)

### Creacion de la tabla en MySQL

Lo mismo pero conectado a MySQL cambiando el DB_ENGINE en el .env.

![Creacion tabla MySQL](./img/creacion_mysql.png)

### Faker - Datos generados

Use faker para generar 20 registros de prueba, los datos los defini manualmente para que cumplan con las validaciones del modelo.

![Datos de Car en DBeaver](./img/datos_de_car.png)

![Faker](./img/faker.png)

### Pruebas HTTP

#### GET ALL
![GET ALL Cars](./img/get_all_cars.png)

#### CREATE
![CREATE Car](./img/create_car.png)

#### UPDATE
![UPDATE Car](./img/update_car.png)

#### DELETE
![DELETE Car](./img/delete_car.png)

---

## 2. Tuitions

### Modelo

Este modelo tiene la llave foranea car_id que referencia a la tabla cars, eso quiere decir que para crear una matricula primero tiene que existir el carro. Tambien le puse validaciones al pago para que no sea negativo y a la ciudad para que no este vacia.

```typescript
export const Tuition = sequelize.define("TUITIONS", {
  tuition_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  date_matricula: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  ciudad: { type: DataTypes.STRING, allowNull: false },
  pago: { type: DataTypes.FLOAT, allowNull: false },
  car_id: { type: DataTypes.INTEGER, allowNull: false }
});
```

![Modelo Tuition](./img/tuition_modelo.png)

### Controlador

Igual que el de cars, tiene los 5 metodos y el manejo de errores. Cuando se hace el GET trae tambien la informacion del carro asociado gracias al include.

![Controlador Tuition](./img/tuition_controller.png)

### Rutas

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/tuitions` | trae todas las matriculas |
| GET | `/api/tuitions/:id` | trae una matricula por id |
| POST | `/api/tuitions` | crea una matricula |
| PUT | `/api/tuitions/:id` | actualiza una matricula |
| DELETE | `/api/tuitions/:id` | elimina una matricula |

![Rutas Tuition](./img/tuition_routes.png)

### Faker - Datos generados

Para las tuitions el faker primero consulta los carros existentes y les asigna un car_id aleatorio de los que ya existen en la base de datos para no violar la llave foranea.

![Datos de Tuition en DBeaver](./img/datos_de_tuition.png)

### Pruebas HTTP

#### GET ALL
![GET ALL Tuitions](./img/get_all_tuition.png)

#### CREATE
![CREATE Tuition](./img/create_tuition.png)

#### UPDATE
![UPDATE Tuition](./img/update_tuition.png)

#### DELETE
![DELETE Tuition](./img/delete_tuition.png)
