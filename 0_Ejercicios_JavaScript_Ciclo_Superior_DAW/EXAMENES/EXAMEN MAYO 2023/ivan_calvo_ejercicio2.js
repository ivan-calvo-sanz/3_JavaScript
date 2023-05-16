window.onload=iniciar;

function iniciar(){
    let tirada=["Primera","Segunda","Tercera","Cuarta","Quinta","Sexta","Septima","Octava","Novena","Decima"];
    let numTirada=0;
    let tabla=document.getElementById("tabla");
    let pie=document.getElementById("pie");
    let colorSeleccionado="azul";

    document.getElementById("pulsa").addEventListener("click",nuevatirada,false);
    
    let spans=document.getElementsByTagName("span");
    for(let i=0;i<spans.length;i++){
        spans[i].addEventListener("click",seleccionarColor,false);
    }

    function seleccionarColor(){
        colorSeleccionado=this.classList[0];
        document.getElementsByClassName("seleccionado")[0].classList.remove("seleccionado");
        this.classList.add("seleccionado");
    }

    
    function nuevatirada(){
        if(numTirada<tirada.length){
            console.log(tabla);
            let tr=document.createElement("tr");
            for(let i=0;i<4;i++){
                let td=document.createElement("td");
                td.setAttribute("class","azul");
                td.addEventListener("click",cambiarColorCelda,false);
                tr.appendChild(td);
            }
            tabla.appendChild(tr);

            pie.innerHTML=`<h2>${tirada[numTirada]} tirada</h2>`;
            numTirada++;
        }else{
            pie.innerHTML=`<h2>Has llegado al tope de tiradas</h2>`;
        }
    }

    function cambiarColorCelda(){
        this.setAttribute("class",colorSeleccionado);
    }
}