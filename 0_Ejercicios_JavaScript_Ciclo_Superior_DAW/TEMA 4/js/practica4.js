//Creo la Clase Edificio
class Edificio {
  //designo los atributos
  calle;
  numero;
  codPostal;
  viviendas = new Array();

  //creo la función Constructora
  constructor(calle, numero, codPostal, plantas) {
    this.calle = calle;
    this.numero = numero;
    this.codPostal = codPostal;
    texto += `- Construido nuevo edificio en ${this.imprimeCalle()}, ${this.imprimeNumero()}, ${this.imprimeCodigoPostal()}<br>`;
  }

  //METODO agregarPlantasYPuertas(numplantas, puertas)
  agregarPlantasYPuertas(numplantas, puertas) {
    //creo un nuevo Array al que posteriormente le unire al Array "plantas" del Objeto
    let nuevasPlantas = new Array();
    for (let i = 0; i < numplantas; i++) {
      // en este elemento "i" del Array genero otro Array
      nuevasPlantas[i] = new Array();
      for (let j = 0; j < puertas; j++) {
        //voy danro valores a los elementos de este nuevo Array dentro del Array
        nuevasPlantas[i][j] = "";
      }
    }
    this.viviendas = this.viviendas.concat(nuevasPlantas);
  }

  //METODO modificarNumero(numero)
  modificarNumero(numero) {
    this.numero = numero;
  }

  //METODO modificarCalle(calle)
  modificarCalle(calle) {
    this.calle = calle;
  }

  //METODO modificarCodigoPostal(codigo)
  modificarCodigoPostal(codigo) {
    this.codPostal = codigo;
  }

  //METODO imprimeCalle
  imprimeCalle() {
    return `la Calle: ${this.calle}`;
  }

  //METODO imprimeNumero
  imprimeNumero() {
    return `Número: ${this.numero}`;
  }

  //METODO imprimeCodigoPostal
  imprimeCodigoPostal() {
    return `CP: ${this.codPostal}`;
  }

  //METODO agregarPropietario(nombre,planta,puerta)
  agregarPropietario(nombre, planta, puerta) {
    if (planta <= this.viviendas.length) {
      //console.log(this.viviendas[planta].length);
      if (puerta <= this.viviendas[planta - 1].length) {
        this.viviendas[planta - 1][puerta - 1] = nombre;
        return `${nombre} es ahora el propietario de la puerta ${puerta} de la planta ${planta}<br>`;
      } else {
        console.log(`La planta ${planta} tiene menos de ${puerta} puertas`);
      }
    } else {
      console.log(`El nº de plantas es menor a ${this.viviendas.length + 1}`);
    }
  }

  //METODO imprimePlantas
  imprimePlantas() {
    let devuelve = `<br><b>Listado de propietarios del edificio de ${this.imprimeCalle()} ${this.imprimeNumero()}</b><br>`;

    for (let i in this.viviendas) {
      for (let j in this.viviendas[i]) {
        devuelve += `Propietario de la planta ${parseInt(i) + 1} piso ${parseInt(j) + 1}: ${this.viviendas[i][j]}<br>`;
      }
    }
    devuelve += "<br>";
    return devuelve;
  }
}

/* creo una variable global "texto", esta variable la utilizo también dentro de la Clase Edificio
(da igual que la haya creado después de la Clase ya que el código de la Clase NO comienza hasta que cremos 
    un Objeto de esta Clase y para entonces ya se ha generado la variable "texto")
*/
let texto = "";

// Instanciamos 3 objetos edificioA, edificioB y edificioC
let edificioA = new Edificio("Garcia Prieto", 58, 15706);
let edificioB = new Edificio("Camino Caneiro", 29, 32004);
let edificioC = new Edificio("San Clemente", "s/n", 15705);

// Agregamos 2 plantas y 3 puertas por planta al edificio A
// planta puerta
edificioA.agregarPlantasYPuertas(2, 3);
console.log(edificioA.viviendas);

// Agregamos 4 propietarios al edificio A
// planta  puerta
texto += edificioA.agregarPropietario("Jose Antonio Lopez", 1, 1);
texto += edificioA.agregarPropietario("Luisa Martinez", 1, 2);
texto += edificioA.agregarPropietario("Marta Castellón", 1, 3);
texto += edificioA.agregarPropietario("Antonio Pereira", 2, 2);

// Listado de propietarios del edificioA
texto += edificioA.imprimePlantas();

// Agregamos 1 planta más al edificio A
// en este caso 1 planta con 5 puertas
edificioA.agregarPlantasYPuertas(1, 5);

// Agregamos 1 propietario más al edificio A planta 3, puerta 2
texto += edificioA.agregarPropietario("Pedro Meijide", 3, 2);

// Listado de propietarios del edificioA
texto += edificioA.imprimePlantas();

//Compruebo los metodos modificarNumero, modificarCalle, modificarCodigoPostal
edificioA.modificarNumero(60);
edificioA.modificarCalle("Las Rozas");
edificioA.modificarCodigoPostal(17999);
/*Listado de propietarios del edificioA tiene que tener las mismas plantas, puertas y propietarios
pero haber cambiado la calle, nº y CP del Edificio */
texto += edificioA.imprimePlantas();
texto += `CP del edificioA: ${edificioA.imprimeCodigoPostal()}`;

document.getElementById("texto").innerHTML = texto;
