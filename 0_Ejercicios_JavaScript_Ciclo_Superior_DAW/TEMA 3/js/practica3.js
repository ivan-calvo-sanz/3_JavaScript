//FUNCION CREA NUEVA VENTANA
function nuevaVentana() {
  // window.open primer atributo linka a un html
  //miVentana = window.open("nueva_ventana.html", "Nueva ventana", "width=700,height=500,resizable=no,scrollbars=no,left=150,top=100");
  miVentana = window.open("", "Nueva ventana", "width=700,height=500,resizable=no,scrollbars=no,left=150,top=100");
  miVentana.document.write("<h3>Ejemplo de Ventana Nueva</h3>");
  miVentana.document.write("URL Completa: " + document.URL + "<br>");
  miVentana.document.write("Protocolo: " + document.protocol + "<br>");
  miVentana.document.write("Nombre en código del navegador: " + navigator.appCodeName + "<br>");

  //determina si Java está o NO disponible
  if (navigator.javaEnabled()) {
    miVentana.document.write("<h4>Java SI disponible en esta ventana</h4>");
  } else {
    miVentana.document.write("<h4>Java NO disponible en esta ventana</h4>");
  }

  //miVentana.document.write('<iframe src="https://www.google.es/" width="800px" height="600px" name="iframe"></iframe>');
  miVentana.document.write('<iframe src="https://elpais.com/" width="800px" height="600px" name="iframe"></iframe>');
}

//FUNCION COMPRUEBA QUE LA FECHA INTRODUCIDA ES CORRECTA
function compruebaFecha(dia, mes, anio) {
  let esBisiesto;
  let fechaCorrecta = false;

  if ((anio % 4 === 0 && anio % 100 != 0) || anio % 400 === 0) {
    esBisiesto = true;
  } else {
    esBisiesto = false;
  }

  if (mes > 0 && mes < 13 && dia > 0) {
    if (mes === 2) {
      if (esBisiesto) {
        if (dia <= 29) fechaCorrecta = true;
      } else {
        if (dia <= 28) fechaCorrecta = true;
      }
    }
    if (mes === 1 || mes === 3 || mes === 5 || mes === 7 || mes === 8 || mes === 10 || mes === 12) {
      if (dia <= 31) fechaCorrecta = true;
    }
    if (mes === 4 || mes === 6 || mes === 9 || mes === 11) {
      if (dia <= 30) fechaCorrecta = true;
    }
  }
  return fechaCorrecta;
}

// variable donde voy introduciendo todos los resultados de los diferentes apartados
let texto = "";
let error = "";

document.write("<h3>TAREA DWEC03</h3><hr>");

//*** USUARIO INTRODUCE NOMBRE Y APELLIDOS ***
//Expresión regular que detecta si existe espacios en blanco
//  \s espacio en blanco, la bandera "g" determina que busque en todo el String
let re = /\s/g;
let coincidencias;
do {
  nombre_apellidos = prompt(error + "introduzca su nombre y apellidos", "");
  //.match devuelve un array con todas las coincidencias de la expresión regular
  coincidencias = nombre_apellidos.match(re);
  error = "Valor erroeno. ";
} while (nombre_apellidos === "" || coincidencias == null || coincidencias.length < 2);

error = "";

// *** USUARIO INTRODUCE FECHA ***
let dia_nacimiento;
let mes_nacimiento;
let anio_nacimiento;
do {
  dia_nacimiento = parseInt(prompt(error + "introduzca DIA de nacimiento", ""));
  mes_nacimiento = parseInt(prompt(error + "introduzca MES de nacimiento", ""));
  anio_nacimiento = parseInt(prompt(error + "introduzca AÑO de nacimiento", ""));
  error = "Valor erroeno. ";
} while (!compruebaFecha(dia_nacimiento, mes_nacimiento, anio_nacimiento));

// *** GUARDO EN VARIABLE LOS RESULTADOS DE LOS DIFERENTES APARTADOS ***
texto += "Buenos dias " + nombre_apellidos + "<br>";
texto += "Tu nombre tiene " + nombre_apellidos.length + " caracteres, incluidos espacios <br>";
texto += "La primera letra A de tu nombre está en la posición: " + (nombre_apellidos.toUpperCase().indexOf("A") + 1) + "<br>";
texto += "La última letra A de tu nombre está en la posición: " + (nombre_apellidos.toUpperCase().lastIndexOf("A") + 1) + "<br>";
texto += "Tu nombre menos las 3 primeras letras es: " + nombre_apellidos.slice(3, nombre_apellidos.length) + "<br>";
texto += "Tu nombre todo en mayúsculas es " + nombre_apellidos.toUpperCase() + "<br>";

//Creo un Objeto tipo Date generando la fecha actual
let fecha_actual = new Date();
//Calcula los años que tiene el usuario
let anios = fecha_actual.getFullYear() - anio_nacimiento;
//Calcula si ya ha cumplido los años en el año actual o todavía NO
if (fecha_actual.getMonth() <= mes_nacimiento) {
  if (fecha_actual.getDate() < dia_nacimiento) {
    anios--;
  }
}

texto += "Tu edad es " + anios + " años<br>";

texto += "Naciste un feliz " + dia_nacimiento + "/" + mes_nacimiento + " del año " + anio_nacimiento + "<br>";

// El coseno de 180 es: XXXXXXXXXX
// para pasar de grados a radianes multiplicar -> * (Math.PI / 180)
// para pasar de radianes a grados dividir -> / (Math.PI / 180)
// convierto los 180º a radianes
let radianes = 180 * (Math.PI / 180);
texto += "El coseno de 180 es: " + Math.cos(radianes) + "<br>";

// El número mayor de (34,67,23,75,35,19) es: XX
let num_mayor = Math.max(34, 67, 23, 75, 35, 19);
texto += "El número mayor de (34,67,23,75,35,19) es: " + num_mayor + "<br>";

// Ejemplo de número al azar: XXXXXXXXXX
// random(); Devuelve un número aleatorio entre 0 y 1
// el numero aleatorio estará entre 0 y 100
let num_azar = Math.round(100 * Math.random());
texto += "Ejemplo de número al azar: " + num_azar + "<br>";

// En el html he creado un <div> con el id->"texto" imprimo en el la variable texto que tiene la solución a todos los apartados
document.getElementById("texto").innerHTML = texto;
