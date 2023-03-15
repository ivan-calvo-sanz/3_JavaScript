const mostrarTablaMultiplicarDel7 = () => {
  let tablaMultiplicarDel7 = document.getElementById("tablaMultiplicarDel7");

  let tabla = "<ul>";
  for (let i = 0; i <= 10; i++) {
    tabla += `<li>7 * ${i} = ${7 * i}</li>`;
  }
  tabla += "<ul>";
  tablaMultiplicarDel7.innerHTML = tabla;
};

mostrarTablaMultiplicarDel7();
