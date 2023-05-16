/*
APRATADO 2: importar XML
mediante XMLHttpRequest
*/

/*
desde la API:
https://randomuser.me/api/?results=5&format=XML
*/

document.getElementById("importarXml").addEventListener("click", cargarXml);
const error = document.getElementById("msgError");

function cargarXml() {
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
      let docXml = xhr.responseXML;

      let results = docXml.getElementsByTagName("results");

      for (let i = 0; i < results.length - 1; i++) {
        table += "<tr><td>";
        table += results[i].getElementsByTagName("id")[0].getElementsByTagName("value")[0].textContent;
        table += "</td><td>";
        table += results[i].getElementsByTagName("name")[0].getElementsByTagName("first")[0].textContent;
        table += "</td><td>";
        table += results[i].getElementsByTagName("name")[0].getElementsByTagName("last")[0].textContent;
        table += "</td><td>";
        table += results[i].getElementsByTagName("dob")[0].getElementsByTagName("age")[0].textContent;
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
  xhr.open("GET", "https://randomuser.me/api/?results=5&format=XML", true);

  /* PASO Nº4: ENVIAR LA PETICION */
  xhr.send();
}
