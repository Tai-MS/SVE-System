# Guía de uso e instalación para SVE

## Descargar repositorio
```
git clone https://github.com/Tai-MS/SVE-System.git
```

## Instalación BACKEND
Una vez clonado el repositorio debe entrar a la carpeta `SVE-System`

El siguiente paso es entrar a la carpeta `BACKEND` e instalar las dependencias.

```
cd ./BACKEND

npm install
```
Luego deberá crear el archivo `.env` el cual debe contener las siguientes variables (las variables también estan disponibles en el `.env.example`):

```
PORT=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=
DB_HOST=
DB_PORT=
SECRET_KEY=
ID_CLIENT_OAUTH=ID CLIENT DE GOOGLE=
SECRET_CLIENT_OAUTH=SECRET CLIENT DE GOOGLE=
SALT_HASH=
EMAIL_PASS=contraseña de aplicacion google
USER_MAILER=email del dueño de EMAIL_PASS
ENV= dev
CLOUD_NAME=
GOOGLE_REFRESH_TOKEN=
GOOGLE_REDIRECT_URI=
ID_CARPETA=
```

**NOTA: las variables `ID_CLIENT_OAUTH, SECRET_CLIENT_OAUTH, EMAIL_PASS, USER_MAILER, GOOGLE_REFRESH_TOKEN, GOOGLE_REDIRECT_URI y ID_CARPETA` son obtenidas a traves de la consola de desarrollador de Google en la sección APIs y Servicios en el siguiente link: https://console.cloud.google.com/apis/dashboard.**

Y luego crear la base de datos SQL con `npx sequelize-cli db:create`. Para que se cree correctamente se necesita tener levantado MySQL en XAMPP y que coincidan las siguientes variables del `.env` con la configuración `SQL`:
```
PORT
DB_USERNAME
DB_PASSWORD
DB_HOST
DB_PORT
```

Con todo esto ya se puede levantar el backend con el comando `npm run dev`

Si se desea se pueden comenzar a realizar pruebas del `backend` desde POSTMAN. Hay que tener en cuenta que para determinadas rutas y acciones se requiere el haber puesto los valores correspondientes en las variables del `.env`.

### Ruta de ejemplo

```
http://localhost:{PORT}/public/iniciarSesion
```

# 
## Instalación FRONTEND
Una vez clonado el repositorio debe entrar a la carpeta `SVE-System`

El siguiente paso es entrar a la carpeta `FRONTEND` e instalar las dependencias.

```
cd ./FRONTEND

npm install
```

Luego deberá crear el archivo `.env` el cual debe contener las siguientes variables:

```
VITE_BACKURL = http://localhost:{PORT}
```
**Nota: `PORT` hace referencia a la variable `PORT` creada en el `.env` del `BACKEND`, por lo tanto deben coincidir.**

Con esto el `FRONTEND` ya es funcional y solo resta levantarlo con:

```
npm run dev
```
# Fin
Si estos pasos se siguieron correctamente, el sistema ya se puede probar de forma **local** ya sea en POSTMAN o en un navegador.

# Extra
Link a la documentación: [https://drive.google.com/drive/folders/1kg6Qb5iE8SqVrg6TYunZQGKpX46HyzNJ?usp=sharing](https://drive.google.com/drive/folders/11K31KfrpFAeDKkqNg7UQQ60wxvIAk8lB?usp=sharing)
