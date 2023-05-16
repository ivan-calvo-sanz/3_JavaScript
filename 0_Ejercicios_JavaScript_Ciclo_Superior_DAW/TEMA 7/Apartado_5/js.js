/*
APRATADO 5: importar JSON
utilizando jQuery
*/

/*
desde la API:
https://randomuser.me/api/?results=5
*/

//.ready  primero se tiene que cargar el documento completo html
$(document).ready(() => {
  $("#tabla").hide();

  $("#importarJSON").click(function () {
    //solicitamos a la API
    $.ajax({
      type: "GET",
      url: "https://randomuser.me/api/?results=5",
      dataType: "json",
      //.done especifica la función que va a realizar cuando se ejecuta correctamente la petición
    }).done((data) => {
      //vaciar los registros de la tabla para que no se concatenen resultados según clickeamos el boton
      $("#tabla tbody").empty();

      let personas = data.results;

      $.each(personas, function (indice, persona) {
        //creo un elemento mediante jQuery de tipo <tr>
        let fila = $("<tr>");
        fila.append($(`<td>${persona.id.value}</td>`));
        fila.append($(`<td>${persona.name.first}</td>`));
        fila.append($(`<td>${persona.name.last}</td>`));
        fila.append($(`<td>${persona.dob.age}</td>`));

        $("#tabla").append(fila);
      });
      $("#tabla").show();
    });
  });
});
