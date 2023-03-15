const mostrarOperaciones = () => {
  /*
        125 / 8 = 15
        1111101 / 8 = 1111
        Para dividir /8 hay que desplazar a la derecha 3 bits
        125>>3
    */
  let dividirEntre8 = document.getElementById("dividirEntre8");
  dividirEntre8.innerHTML = `<h3>125 / 8 = ${125 >> 3}  </h3>`;

  /*
        40 x 4 = 160
        101000 x 4 = 10100000
        Para multiplicar x4 hay que desplazar a la izquierda 2 bits
        40<<2
    */
  let multiplicarPor4 = document.getElementById("multiplicarPor4");
  multiplicarPor4.innerHTML = `<h3>40 x 4 = ${40 << 2}  </h3>`;

  /*
        25 / 2 = 12,5
        11001 / 2 = 1100
        Para dividir /2 hay que desplazar a la derecha 1 bit
        40>>1
    */
  let dividirEntre2 = document.getElementById("dividirEntre2");
  dividirEntre2.innerHTML = `<h3>25 / 2 = ${25 >> 1}  </h3>`;

  /*
        10 x 16 = 160
        1010 x 16 = 10100000
        Para multiplicar x16 hay que desplazar a la izquierda 4 bits
        10<<4
    */
  let multiplicarPor16 = document.getElementById("multiplicarPor16");
  multiplicarPor16.innerHTML = `<h3>10 x 16 = ${10 << 4}  </h3>`;
};

mostrarOperaciones();
