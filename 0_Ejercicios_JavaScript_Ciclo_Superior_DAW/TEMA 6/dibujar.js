/********************
FUNCION INICIAR 
********************/
const iniciar = () => {
  dibujarTablero();
  agregarListeners();
};

/********************
FUNCION DIBUJAR TABLA 
********************/
const dibujarTablero = () => {
  //creo el nodo "table" y le asigno atributos border y class
  let tabla = document.createElement("table");
  tabla.setAttribute("border", "1");
  tabla.setAttribute("class", "tablerodibujo");
  tabla.setAttribute("id", "tablerodibujo");

  let titulo = document.createElement("caption");
  let texto = document.createTextNode("Haga CLICK en cualquier celda para activar/desactivar el Pincel");
  titulo.appendChild(texto);
  tabla.appendChild(titulo);

  //genero las 30x30 celdas y se las añado a la tabla
  for (let i = 0; i < 30; i++) {
    let tr = document.createElement("tr");
    for (let j = 0; j < 30; j++) {
      let td = document.createElement("td");
      tr.appendChild(td);
    }
    tabla.appendChild(tr);
  }
  //añado al id del html el nodo tabla
  document.getElementById("zonadibujo").appendChild(tabla);
};

/********************
FUNCION agregarListeners() 
********************/
const agregarListeners = () => {
  let tablaColores = document.getElementById("paleta");
  let tableroDibujo = document.getElementById("tablerodibujo");
  let pincel = document.getElementById("pincel");

  //AGRERO EVENTOS A LA TABLA "paleta"
  // OPCION 1
  // recorro todas las celdas (td) de la tablaColores y las añado el evento "click"
  // al evento "click" le designo una función anónima la cual recorre todas las celdas y elimina en cada celda la clase "seleccionado"
  // luego añade la clase "seleccionado" a la celda que se ha producido el evento "click"
  /*   let celdasColores = tablaColores.getElementsByTagName("td");
  for (let i = 0; i < celdasColores.length; i++) {
    celdasColores[i].addEventListener("click", detectarColor, false);
  } */

  // OPCION 2
  //en JS los nodos hijo recogen los eventos del nodo padre
  //por lo tanto dando el evento al padre los hijos también tendrán ese evento
  tablaColores.addEventListener("click", detectarColor, false);

  // AGRERO EVENTOS A LA TABLA "tablerodibujo"
  // EVENTO "click" al iniciar el dibujo
  tableroDibujo.addEventListener("click", iniciarPintura, false);
};

const detectarColor = (e) => {
  //el elemnto que genera el evento sigue siendo la celda "td" correspondiente
  for (let i = 0; i < e.target.parentNode.childNodes.length; i++) {
    e.target.parentNode.childNodes[i].classList.remove("seleccionado");
  }

  // para que no se añada la clase "seleccionado" a la celda td "pincel"
  if (e.target.id !== "pincel") {
    e.target.classList.add("seleccionado");
  }

  let seleccionado;
  // recorro las celdas "td" buscando la que tenga la clase "seleccionado"
  for (let i = 0; i < e.target.parentNode.childNodes.length; i++) {
    if (e.target.parentNode.childNodes[i].classList.contains("seleccionado")) {
      seleccionado = i;
    }
  }
  colorActivo = seleccionado;
  if (seleccionado < 5) {
    pincel.innerHTML = "PINCEL ACTIVADO";
  } else {
    pincel.innerHTML = "PINCEL DESACTIVADO";
  }
};

const iniciarPintura = (e) => {
  // para que solo se añada la clase "colorx" a la celda "td" y no a toda la tabla
  if (colorActivo < 6 && e.target.nodeName === "TD") {
    e.target.classList.add("color" + (colorActivo + 1));
    //mouseActivado = true;
  }
  mouseActivado = true;

  // e (hace referencia a la celda td) como tengo que indicar a la tabla el evento "mouseover"
  // subo dos niveles por ello .parentNode.parentNode
  e.target.parentNode.parentNode.addEventListener("mouseover", dibujarLienzo, false);
  e.target.parentNode.parentNode.addEventListener("click", removerMouseOver, false);
};

const dibujarLienzo = (e) => {
  if (colorActivo < 6 && e.target.nodeName === "TD" && mouseActivado) {
    e.target.classList.add("color" + (colorActivo + 1));
  }
};

const removerMouseOver = (e) => {
  e.target.parentNode.parentNode.removeEventListener("mouseover", dibujarLienzo, false);
  mouseActivado = true;
  console.log("remover");
  // e.target.parentNode.parentNode.removeEventListener("mouseover", removerMouseOver, false);
};

/********************
INICIO DEL CODIGO EN CASCADA
********************/
// Inicio variable genericas
let mouseActivado = false;
let colorActivo;

// tiene que cargar por completo el html y posteriormente que ejecute las funciones
window.addEventListener("load", iniciar);
