/********************
Desde local en Chrome no se pueden crear Cookies
requiere que sea llamado desde http
comprobar funcionamiento en local desde otros navegadores
/********************

/********************
FUNCION INICIAR 
********************/
const iniciar = () => {
  //al iniciar hay que inicializar la cookie a 0
  crearBorrarCookie("contador", 0, 3600);
  //EVENTO cuando hacemos click en el botón "Enviar" se llama a la función validar
  document.getElementById("enviar").addEventListener("click", validarFormulario, false);
  //EVENTO cuando los text nombre y apellidos pierden el foco se llama a la función convertirMayuscula
  document.getElementById("nombre").addEventListener("blur", convertirMayuscula, false);
  document.getElementById("apellidos").addEventListener("blur", convertirMayuscula, false);
};

/********************
FUNCION VALIDAR FORMULARIO 
********************/
//cada vez que damos al boton Enviar se ejecuta validarFormulario
function validarFormulario(eventoPorDefecto) {
  //sumamos 1 al valor que tenga la cookie "contador"
  crearBorrarCookie("contador", parseInt(readCookie("contador")) + 1, "3600");
  //mostar el valor de la cookie "contador" en el div
  let texto = `Intento de Envíos del formulario: ${readCookie("contador")}`;
  document.getElementById("intentos").innerHTML = texto;
  //llamamos a la función comprobar Nombre y Apellidos
  //le pasamos this (en este caso es el objeto boton "enviar")
  //console.log(this);
  /* 
    12.	Pedir confirmación de envío del formulario. 
    Si se confirma el envío realizará el envío de los datos; en otro caso cancelará el envío.
    */
  if (
    comprobarNombreApellidos(this) &&
    validarEdad() &&
    validarNIF() &&
    validarEmail() &&
    validarProvincias() &&
    validarFecha() &&
    validarTelefono() &&
    validarHora() &&
    confirm("¿Deseas enviar el formulario?")
  ) {
    return true;
  } else {
    // Cancelo el envío de formulario por defecto
    eventoPorDefecto.preventDefault();
    return false;
  }
}

/********************
FUNCIONES COOKIES 
********************/
//FUNCION Crear & Borrar Cookie
const crearBorrarCookie = (nombre, valor, tiempo) => {
  // tiempo en segundos
  // si NO se pasa tiempo SE ELIMINA la cookie
  let maxAge;
  if (tiempo) {
    maxAge = `; max-age=${tiempo}; path=/`;
  } else {
    //se elimina la Cookie
    maxAge = `; max-age=0`;
  }
  document.cookie = nombre + "=" + valor + maxAge;
};

/* //Comprobar funcion
crearBorrarCookie("contador", 5, "3600");
crearBorrarCookie("contador2", 10, "3600");
console.log(document.cookie);
console.log(document.cookie.split(";")); */

//FUNCION Leer Cookie
const readCookie = (name) => {
  let nameEqual = name + "=";
  let cArray = document.cookie.split(";");
  for (let i = 0; i < cArray.length; i++) {
    let c = cArray[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEqual) == 0) {
      return c.substring(nameEqual.length, c.length);
    }
  }
  return null;
};

/* //Comprobar funcion
console.log(readCookie("contador"));
console.log(readCookie("contador2")); */

/********************
FUNCIONES TAREA 
********************/
/* 
3.	Cada vez que los campos NOMBRE y APELLIDOS pierdan el foco, 
el contenido que se haya escrito en esos campos se convertirá a mayúsculas. 
*/
const convertirMayuscula = () => {
  document.getElementById("nombre").value = document.getElementById("nombre").value.toUpperCase();
  document.getElementById("apellidos").value = document.getElementById("apellidos").value.toUpperCase();
};

/* 
4.	Realizar una función que valide los campos de texto NOMBRE y APELLIDOS. 
Si se produce algún error mostrar el mensaje en el contenedor "errores" y poner 
el foco en los campos correspondientes.
 */
const comprobarNombreApellidos = (obj) => {
  //mediante .form obtengo el formulario que se ha enviado con submit
  //console.log(obj);
  let form = obj.form;
  //console.log(form);
  for (let i = 0; i < form.elements.length; i++) {
    //elimino la clase error que pudiera haber aplicado a algun elemento
    form.elements[i].className = "";
    document.getElementById("errores").innerHTML = "";
    if (form.elements[i].name == "nombre" && form.elements[i].value == "") {
      //existe un estilo .error para destacar el elemento que está dando error
      // por ello añado a la lista .className="error"
      form.elements[i].className = "error";
      form.elements[i].focus();
      document.getElementById("errores").innerHTML = "Error: " + form.elements[i].name + " NO puede estar vacio";
      return false;
    }
    if (form.elements[i].name == "apellidos" && form.elements[i].value == "") {
      //existe un estilo .error para destacar el elemento que está dando error
      // por ello añado a la lista .className="error"
      form.elements[i].className = "error";
      form.elements[i].focus();
      document.getElementById("errores").innerHTML = "Error: " + form.elements[i].name + " NO puede estar vacio";
      return false;
    }
  }
  return true;
};

/* 
5.	Validar la EDAD que contenga solamente valores numéricos y que esté en el rango de 0 a 105. 
Si se produce algún error mostrar el mensaje en el contenedor "errores" y poner el foco en el campo EDAD.
 */
const validarEdad = () => {
  if (document.getElementById("edad").value === "" || isNaN(document.getElementById("edad").value) || document.getElementById("edad").value < 0 || document.getElementById("edad").value > 105) {
    document.getElementById("edad").focus();
    //existe un estilo .error para destacar el elemento que está dando error
    // por ello añado a la lista .className="error"
    document.getElementById("edad").className = "error";
    document.getElementById("errores").innerHTML = "Error: " + document.getElementById("edad").name + " NO es válido";
    return false;
  }
  //elimino la clase error que pudiera haber aplicado anteriormente
  document.getElementById("errores").className = "";
  document.getElementById("errores").innerHTML = "";
  return true;
};

/* 
6.	Validar el NIF. Utilizar una expresión regular que permita solamente 8 números un guión y una letra. 
Si se produce algún error mostrar el mensaje en el contenedor "errores" y poner el foco en el campo NIF. 
No es necesario validar que la letra sea correcta. Explicar las partes de la expresión regular mediante comentarios.
 */
const validarNIF = () => {
  //    /^      comienza la expresion
  //    \d{8}   indica que tienen que aparecer 8 digitos
  //    -       tiene que aparecer un guion
  //    [A-Z]   tiene que aparecer cualquier caracter  de la A a la Z
  //    $/      finaliza la expresion
  // en el siguiente enlace se puede validar expresiones regulares
  //https://regexr.com/

  let patron = /^\d{8}-[A-Z]$/;
  if (!patron.test(document.getElementById("nif").value)) {
    document.getElementById("nif").focus();
    //existe un estilo .error para destacar el elemento que está dando error
    // por ello añado a la lista .className="error"
    document.getElementById("nif").className = "error";
    document.getElementById("errores").innerHTML = "Error: " + document.getElementById("nif").name + " No es válido";
    return false;
  }
  document.getElementById("nif").className = "";
  document.getElementById("errores").innerHTML = "";
  return true;
};

/* 
7.	Validar el E-MAIL. Utilizar una expresión regular que nos permita comprobar que el e-mail 
sigue un formato correcto. Si se produce algún error mostrar el mensaje en el contenedor "errores" 
y poner el foco en el campo E-MAIL. Explicar las partes de la expresión regular mediante comentarios.
 */
const validarEmail = () => {
  //    /^      comienza la expresion
  //    [\w-\.]{2,}     Cualquier caracter de los que indicamos entre corchetes, al menos 2 y como maximo indefinido
  //                    \w- cualquier caracter letra o digitos incluido el guion
  //                    \.  incluido el punto
  //    @       aparezca una Arroba
  // ([\w-]{2,}\.)
  //    [\w-]{2,}       Cualquier caracter de los que indicamos entre corchetes, al menos 2 y como maximo indefinido
  //                    \w- cualquier caracter letra o digitos incluido el guion
  //    \.  aparezca un punto
  // ([\w-]{2,4})       Cualquier caracter de los que indicamos entre corchetes, al menos 2 y como maximo 4
  //                    \w- cualquier caracter letra o digitos incluido el guion
  //    $/      finaliza la expresion
  let patron = /^[\w-\.]{2,}@([\w-]{2,}\.)+([\w-]{2,4})$/;
  if (!patron.test(document.getElementById("email").value)) {
    document.getElementById("email").focus();
    document.getElementById("email").className = "error";
    document.getElementById("errores").innerHTML = "Error: " + document.getElementById("email").name + " No es válido";
    return false;
  }
  document.getElementById("email").className = "";
  document.getElementById("errores").innerHTML = "";
  return true;
};

/* 
8.	Validar que se haya seleccionado alguna de las PROVINCIAS. 
Si se produce algún error mostrar el mensaje en el contenedor "errores" y poner el foco en el campo PROVINCIA.
*/
const validarProvincias = () => {
  if (document.getElementById("provincia").selectedIndex === 0) {
    document.getElementById("provincia").focus();
    document.getElementById("provincia").className = "error";
    document.getElementById("errores").innerHTML = "Error: " + document.getElementById("provincia").name + " No es válido";
    return false;
  }
  document.getElementById("provincia").className = "";
  document.getElementById("errores").innerHTML = "";
  return true;
};

/* 
9.	Validar el campo FECHA utilizando una expresión regular. 
Debe cumplir alguno de los siguientes formatos: dd/mm/aaaa o dd-mm-aaaa. 
No se pide validar que sea una fecha de calendario correcta. 
Si se produce algún error mostrar el mensaje en el contenedor "errores" y poner el foco en el campo FECHA. 
Explicar las partes de la expresión regular mediante comentarios.
*/
const validarFecha = () => {
  //    /^      comienza la expresion
  //    \d{2}   indica que tienen que aparecer 2 digitos
  //    [-/]    tiene que aparecer un guion o barra inclinada
  //    \d{4}   indica que tienen que aparecer 4 digitos
  //    $/      finaliza la expresion
  // en el siguiente enlace se puede validar expresiones regulares
  //https://regexr.com/
  let patron = /^\d{2}[-/]\d{2}[-/]\d{4}$/;
  if (!patron.test(document.getElementById("fecha").value)) {
    document.getElementById("fecha").focus();
    document.getElementById("fecha").className = "error";
    document.getElementById("errores").innerHTML = "Error: " + document.getElementById("fecha").name + " No es válido";
    return false;
  }
  document.getElementById("fecha").className = "";
  document.getElementById("errores").innerHTML = "";
  return true;
};

/* 
10.	Validar el campo TELEFONO utilizando una expresión regular. 
Debe permitir 9 dígitos obligatorios. Si se produce algún error mostrar el mensaje en el contenedor "errores" 
y poner el foco en el campo TELEFONO. Explicar las partes de la expresión regular mediante comentarios.
*/
const validarTelefono = () => {
  //    /^      comienza la expresion
  //    \d{9}   indica que tienen que aparecer 2 digitos
  //    $/      finaliza la expresion
  // en el siguiente enlace se puede validar expresiones regulares
  //https://regexr.com/
  let patron = /^\d{9}$/;
  if (!patron.test(document.getElementById("telefono").value)) {
    document.getElementById("telefono").focus();
    document.getElementById("telefono").className = "error";
    document.getElementById("errores").innerHTML = "Error: " + document.getElementById("telefono").name + " No es válido";
    return false;
  }
  document.getElementById("telefono").className = "";
  document.getElementById("errores").innerHTML = "";
  return true;
};

/* 
11.	Validar el campo HORA utilizando una expresión regular. 
Debe seguir el patrón de hh:mm. No es necesario validar que sea una hora correcta. 
Si se produce algún error mostrar el mensaje en el contenedor "errores" y poner el foco en el campo HORA. 
Explicar las partes de la expresión regular mediante comentarios.
*/
const validarHora = () => {
  //    /^      comienza la expresion
  //    \d{2}   indica que tienen que aparecer 2 digitos
  //    :       indica que tiene que aparecer :
  // en el siguiente enlace se puede validar expresiones regulares
  //https://regexr.com/
  let patron = /^\d{2}:\d{2}$/;
  if (!patron.test(document.getElementById("hora").value)) {
    document.getElementById("hora").focus();
    document.getElementById("hora").classList = "error";
    document.getElementById("errores").innerHTML = "Error: " + document.getElementById("hora").name + " No es válido";
    return false;
  }
  document.getElementById("hora").classList = "";
  document.getElementById("errores").innerHTML = "";
  return true;
};

/********************
INICIO DEL CODIGO EN CASCADA
********************/
// Primero se carga todo el html y posteriormente se ejecuta la funcion iniciar
window.onload = iniciar;
