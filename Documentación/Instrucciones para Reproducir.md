## Instrucciones para reproducir

En primera instancia, es importante tener instalado un par de dependencias ya mencionadas. Primero instalaremos NodeJS (20.11.1) con NPM (10.2.4), esto puede realizarse en su página oficial: [NodeJS](https://nodejs.org/en).

### Frontend
Una vez instalada esta herramienta procederemos a situarnos por consola, en la carpeta respectiva de "frontend" y procederemos a utilizar el siguiente comando para instalar todas las dependencias que utiliza el proyecto.

```bash
npm install
```

Una vez instaladas las dependencias, solo es necesario crear un archivo de variables de entorno en la carpeta raíz, la cual poseerá rutas tanto para frontend como backend. En este caso, como el proyecto se encuentra instanciado con Vite, es necesario que la variable de entorno que consumirá el frontend tenga antepuesto en su defición la palabra "VITE" por lo que quedaría algo como lo siguiente: 

> VITE_REACT_APP_API_URL="Ruta_Local_Usuario_Host"/api/data/

Donde "Ruta_Local_Usuario_Host" viene a ser la ruta respectiva que se genera al levantar el apartado del backend de forma local (o en caso de alojarlo en algún servicio de Hosting), donde lo siguiente viene a ser la ruta definida por el backend para recibir peticiones, a lo que en casos prácticos para este proyecto se utilizo esta estructura de ruta.

Ahora, es posible levantar el lado del frontend independientemente, dado que una vez que tengamos la ruta de acceso del backend, podremos hacer cambios en la variable de entorno y refrescar el proyecto para tomar las rutas respectivas. Para levantar el lado del frontend de forma local realizaremos el siguiente comando:

```bash
npm run dev
```
A lo que ya estará arriba la cascara de la aplicación y continuaremos con el backend. (Recordar la ruta utilizada por el Frontend para definir más adelante las variables de entorno del Backend)

### Backend

 Por el lado del backend, nos situaremos en su carpeta (backend) dentro del proyecto e instalaremos Python (3.9.1) con PIP (24.0), donde para estos dos últimos se recomienda tener un entorno virtual para manejar la estructura del backend dentro de su respectivo directorio para mantener orden y estructura del ambiente de trabajo aislado y sus dependencias. Independiente de lo que realices debes tener instalado Python en tu ordenador, entonces, asumiendo que tienes la versión mencionada de python en tu equipo procederemos a crear un entorno virtual dentro de la carpeta "backend" de la siguiente forma:

 ```bash
 python -m venv venv
 source venv/bin/activate
 ```

Aquí creamos y activamos el entorno virtual "venv" de python y podemos proceder a instalar las dependencias especificadas del archivo "requirements.txt" mediante el siguiente comando:

```bash
pip install -r requirements.txt
```

Una vez realizado eso ya tendremos todas las dependencias de nuestro proyecto instaladas y como pasos finales vamos a definir la ruta y puertos de nuestro backend en el archivo de variables de entorno en la carpeta raíz del proyecto, considerando las siguientes rutas:

> FRONT_URL="Ruta_del_Frontend"

> API_URL="Ruta_del_backend"/api/data/
 
> API_ROUTE=/api/data/

> API_FILES=data/

Finalmente ingresamos en la carpeta "api" y levantamos el servicio de backend de la siguiente forma:

```bash
python app.py
```
 
 * Como dato extra: Si se desea especificar el puerto de salida de forma más detallada o sobre la marcha, puede investigar sobre el uso del comando "Flask run" para realizar esto.

Y ya está, todo el proyecto se encuentra levantado y puedes acceder a la respectiva ruta del frontEnd para poder utilizar la aplicación web
* No olvides de configurar correctamente la ruta del frontend de "Vite" una vez tengas definida la respectira ruta de backend para que pueda realizar correctamente las consultas HTTP