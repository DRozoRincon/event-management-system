# Event Management System

Este documento proporciona los pasos necesarios para poner en marcha el proyecto **Event Management System**.

## Paso 1: Levantar los contenedores

Ejecuta el siguiente comando para iniciar los contenedores:

```bash
docker-compose up -d --build --remove-orphans
````


> **Nota**: Asegúrate de que los puertos **8000-8004** y **5432** estén libres para evitar conflictos.

## Paso 2: Conectar a la base de datos

Conéctate a la base de datos **PostgreSQL** utilizando las credenciales especificadas en el archivo de entorno (`.env`):

- **Host**: localhost
- **Puerto**: 5432
- **Usuario**: myuser
- **Contraseña**: mypassword
- **Base de datos**: mydatabase

Una vez conectado, navega hasta la carpeta `database` en el proyecto y ejecuta los siguientes archivos en la base de datos en el orden indicado:

1. `ddl.sql` (creación de las tablas)
2. `dml.sql` (inserción de datos de prueba)

## Paso 3: Probar la API

La API está documentada mediante **Swagger**. Para acceder a la documentación, abre tu navegador y visita:

```bash
http://localhost:8000/api-docs/
```


## Documentación adicional

En los siguientes enlaces encontrarás recursos adicionales relacionados con el proyecto:

1. [Documentación del proyecto](https://drive.google.com/drive/folders/100QmgiJLRI4UxvjOXGpIR1hOYuAbP_j7?usp=sharing): Incluye un video explicativo del reto y un archivo Excel con la planificación del proyecto. Este archivo excel fundamenta los commits, ramas y merge que se realizaron.
   
2. [Diagrama de base de datos y mockups](https://www.figma.com/board/j3Si9AHQ6IAylMyCPK27bC/Event-Management-Diagrams?node-id=3015-6775&t=EIC5XhsjlxAYP8Zi-1): Aquí encontrarás el diagrama de la base de datos y un mockup de las vistas de la aplicación, lo que te permitirá entender mejor los endpoints implementados.
