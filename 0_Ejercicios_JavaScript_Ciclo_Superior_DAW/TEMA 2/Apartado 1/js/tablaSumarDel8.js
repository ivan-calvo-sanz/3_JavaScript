const mostrarTablaSumarDel8 = () => {
  let tablaSumarDel8 = document.getElementById("tablaSumarDel8");

  let tabla = "<ul>";
  let i = 0;
  while (i <= 10) {
    tabla += `<li>8 + ${i} = ${8 + i}</li>`;
    i++;
  }
  tabla += "<ul>";
  tablaSumarDel8.innerHTML = tabla;
};

mostrarTablaSumarDel8();
