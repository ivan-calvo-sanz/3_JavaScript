/*
APRATADO 3: importar JSON
mediante XMLHttpRequest
*/

/*
desde la API:
https://randomuser.me/api/?results=5
*/

document.getElementById("importarJSON").addEventListener("click", cargarJSON);
const error = document.getElementById("msgError");

function cargarJSON() {
  /* PASO Nº1: CREAR LA INSTANCIA del objeto XMLHttpRequest */
  const xhr = new XMLHttpRequest();
  let table = "<tr><th>ID</th><th>Nombre</th><th>Apellido</th><th>Edad</th></tr>";

  /* PASO Nº2: CREAR LOS EVENTOS */
  //readystatechange es el evento más importante ya que el solo detecta otros eventos como abort,error,load,etc
  //readystatechange se ejecuta cada vez que hay un cambio en el state del servidor
  xhr.addEventListener("readystatechange", (e) => {
    /*     *** ESTADO DE PETICION ***
        READY_STATE_UNINITIALIZED   = 0
        READY_STATE_LOADING         = 1    
        READY_STATE_LOADED          = 2
        READY_STATE_INTERACTIVE     = 3
        READY_STATE_COMPLETE        = 4
    */
    //cuando el estado sea diferente a 4 que siga cargando los datos del servidor
    if (xhr.readyState !== 4) return;
    /*     *** CODIGOS RESPUESTA SOLICITUD HTTP ***
      1. Respuestas informativas    (100-199)
      2. Respuestas satisfactorias  (200-299)
      3. Redirecciones              (300-399)
      4. Errores de cliente         (400-499)
      5. Errores de servidor        (500-599) 
    */
    //una vez se hayan cargado todos los datos del servidor el State será = 4 entonces sigue el código
    //validamos el status de la respuesta
    if (xhr.status >= 200 && xhr.status < 300) {
      console.log("exito");
      //la respuesta está en formato JSON por tanto la respuesta la convertimos en un JSON
      let json = JSON.parse(xhr.responseText);
      // el JSON es un arreglo
      for (let i = 0; i < json.results.length; i++) {
        table += "<tr><td>";
        table += json.results[i].id.value;
        table += "</td><td>";
        table += json.results[i].name.first;
        table += "</td><td>";
        table += json.results[i].name.last;
        table += "</td><td>";
        table += json.results[i].dob.age;
        table += "</td></tr>";
      }
      document.getElementById("tabla").innerHTML = table;
    } else {
      console.log("error");
      let message = xhr.statusText || "Ocurrió un error";
      error.innerHTML = `Error: ${xhr.status}: ${message}`;
    }
  });

  /* PASO Nº3: ABRIR LA PETICION */
  xhr.open("GET", "https://randomuser.me/api/?results=5");

  /* PASO Nº4: ENVIAR LA PETICION */
  xhr.send();
}
