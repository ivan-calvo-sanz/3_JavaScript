/*
APRATADO 4: importar XML
utilizando jQuery
*/

/*
desde la API:
https://randomuser.me/api/?results=5&format=XML
*/

//.ready  primero se tiene que cargar el documento completo html
$(document).ready(() => {
  $("#tabla").hide();

  $("#importarXML").click(function () {
    //solicitamos a la API
    $.ajax({
      type: "GET",
      url: "https://randomuser.me/api/?results=5&format=XML",
      //url: "assets/datos.xml",
      dataType: "xml",
      //.done especifica la función que va a realizar cuando se ejecuta correctamente la petición
    }).done((data) => {
      //vaciar los registros de la tabla para que no se concatenen resultados según clickeamos el boton
      $("#tabla tbody").empty();

      //los datos XML los convertimos a JSON mediante $(data)
      $(data)
        .find("results")
        .each(function () {
          //creo un elemento mediante jQuery de tipo <tr>
          let fila = $("<tr>");
          fila.append($(`<td>${$(this).find("id").find("value").text()}</td>`));
          fila.append($(`<td>${$(this).find("name").find("first").text()}</td>`));
          fila.append($(`<td>${$(this).find("name").find("last").text()}</td>`));
          fila.append($(`<td>${$(this).find("dob").find("age").text()}</td>`));

          $("#tabla").append(fila);
        });
      $("#tabla").show();
    });
  });
});
