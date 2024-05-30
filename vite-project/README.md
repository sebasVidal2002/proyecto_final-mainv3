# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

parte 1
-Se creo un proyecto web de firebase para utilizar el servicio de autenticacion para el registro y login para correo y contraseña. el sdk se copio y pego en un archivo llamado credenciales.js
parte 2
-componentes padres, hijos y operadores ternarios para la codificacion y el apoyo a firebase
    -importo los modulos de firebase en nuestro archivo principal app.jsx para utilizar los servicios de autenticacion por medio del getAuth y para saber los estados de autenticacion onAuthStateChanged.
    -en la carpeta components creamos el login y home y sus cuerpos de componentes. En app.jsx importamos los componentes. En function app creamos una variable de estado const usuario-setusuario y empieza en null la variable. Usamos el metodo para comprobar los estados de autentificacion que va a recibir auth como parametro y tambien crear el parametro usuariofirebase, luego un if que se alerta si hay un usuario en registro o login y guardarla en el parametro creado anteriormente y  si no el setUsario se guarde en null. Ya en el div de return colocamos mediante un operador ternario que si hay alguien en la variable usuario cambie a home y si no permanece en el login.

parte 3
-se utilizo boostrap como framework para css, se copio una cdn de css y se pego en el html. se dividio en 2, una para el formulario y otra para una imagen representativa que fomente la estetica de la UI la imagen importada fue esta en los assets que posteriormente se importo en el archivo login.jsx. enm resumen se aplicaron estilos a los diferentes elementos del login

parte 4
-en el login se creo una constante Registrando, setRegistrando y que su estado empezar en 0, en este mismo archivo de login tambien se importaron las credenciales y los modulos de autenticacion del archivo firebase y usamos el createUserWithEmailAndPassword y otro para el login signinWithEmailAndPassword. se creo la const auth = getAuth y le pasamos lo de firebase. En el primer boton para iniciar sesion y/ registrarse se utilizo un operador ternario que diga que si en registrando hay algo, o es true que diga registrate o sino, inicia sesion. en el titulo H4 tambien vamos a usar un oprador ternario que significa que si registrando es true ponga el texto "si ya tienes cuenta" o si no "No tienes cuenta". Ahora programamos la logica del segundo boton que esta al lado del h4 con un operador ternario que indica que si registrando tiene algo inicie sesio o si no que se registre y a ese mismo boton con lo que tenemos en react utilizamos el onclick para cambiar el registrando por la negacion de registrando para que cambie su valor y finaliza esta parte aplicando estilos a los elementos.

parte 5
 se le puso a ids a los input email para el correo y se creo una cons functAutenticacion como funcion asincrona que va a recibir un event. al formulario form le colocamos un evento onSubmit y se lo envie directamente a la funcion de autenticacion y cuando la envie lo va a volver un una fucnion e.preventDefatult. luego se creo una constante para el correo que se relaciona con el id del correo y lo mismo con la contraseña en resumen se creo esa funcion para guardar los eventos de correo y password. Luego se crea un if que si se encuentra en true vamos a hacer un guardado de una cosa u otra, usamos await para peticiones asincronas, entonces si await es cierto cree el usuario y la contraseña, con el metodo de autenticacion de firebase, el correo y la contraseña y si no se cumple lo anterior el await seria con el metodo sigInWithEmailAndPassword y coje de parametros lo mismo que el anteior la autenticacion, el correo y la contraseña. entonces por medio de estructuracion podemos darle la bienvenida al user con su prop de correoUsuario y se centra. Luego se creo un boton con su classname para estilos y le vamos a decir que se llame logout y mediante su propiedad onclick el logout se importo anteriormente desde el firebase y tambien esta mismo archivo en otra linea y usamos el metodo logOut y al onclick se le aplica ese mismo metodo para salirse de la cuenta y devolverse

 parte 6
 Para retroalimentar al usuario de esta ingresando credenciales invalidas creamos un trycatch en la const de events que diga que si todo esta bien siga su curso de programacion establecido pero si no funciona utilizamos un alert para notificar al usuario que esta ingresando credenciales invalidas. En el registro se hizo algo muy parecido usamos el trycatch y en el error simplemente reemplazamos el texto

 productos
 parte 1
 se creo el archivo data.js donde en un arreglo van a estar todos los productos y su informacion. creamos dos componentes jsx el header y el product list. Estos componentes los llamamos en el home mediante un fragmento vacio
 -en el header se puso todo lo relacionado a lo que hay en este elemento y sus estilos la tienda y el logo del carrito
 -en el product list colocamos la logica y los contenedores de este apartado y sus productos
    