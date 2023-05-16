let tic = ["HTML", "CSS", "MySQL", "PHP", "Java", "Git", "JavaScript"];
let ticNew;

do {
  ticNew = prompt("Introduzca nueva tecnología aprendida:");
  if (ticNew != "fin" && ticNew != " ") {
    tic.push(ticNew);
  }
} while (ticNew != "fin");

alert(`¡Hola! Soy Iván, con conocimientos en: ${tic}`);
