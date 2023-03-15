const mostrarTablaDividirDel9 = () => {
  let tablaDividirDel9 = document.getElementById("tablaDividirDel9");

  let tabla = "<ul>";
  let i = 0;
  let num;
  do {
    num = (9 / i).toFixed(2);
    tabla += `<li>9 / ${i} = ${num}</li>`;
    i++;
  } while (i <= 10);

  tabla += "<ul>";
  tablaDividirDel9.innerHTML = tabla;
};

mostrarTablaDividirDel9();
