/* OBJETO BIBLIOTECA */
function Biblioteca(nombre,maxLibros){
    this.nombre=nombre;
    this.maxLibros=maxLibros;
    this.temas=["Astronomía","Geografía","Tecnología"];

    this.plantas=[];
    for(let i=0;i<this.temas.length;i++){
        this.plantas.push(new Planta(i,this.maxLibros,this.temas[i]));
    };

    this.plantallena=(p)=>{
        if(this.plantas[p].libros.length==this.maxLibros){
            return true;
        }    else{
            return false;
        }
    };

    this.estalibro=(p,l)=>{
        return this.plantas[p].libros.includes(l);
    };

    this.agregalibro=(p,l)=>{
        if(!this.plantallena(p)){
            this.plantas[p].libros.push(l);
        }
    };

    this.consulta=(p)=>{
        return this.plantas[p].libros;
    }
}

/* OBJETO PLANTA */
function Planta(planta, maxLibros, tematica){
    this.planta=planta;
    this.maxLibros=maxLibros;
    this.tematica=tematica;
    this.libros=[];

    this.getCodigoLibro=(titulo)=>{
        return this.tematica+this.libros.indexOf(titulo);
    };
}

const iniciar=()=>{
    let b=new Biblioteca("Cultura para todos",4);
    document.getElementById("Biblioteca").innerHTML=`<b>${b.nombre}</b>`;
    let imagen=document.getElementById("imagen");
    imagen.src="biblioteca.jpg";
    let texto=document.getElementById("texto");
    texto.innerHTML=`Empezando el proceso`;

    document.getElementById("nombre").addEventListener("blur",function(){
        this.value=this.value.toUpperCase();
    });

    document.getElementById("insertar").addEventListener("click",agregarLibro);
    document.getElementById("nombreplanta").addEventListener("click",librosPlanta);
    document.getElementById("codigo").addEventListener("click",codigo);
    document.getElementById("book").addEventListener("click",buscarLibro);

    /* funcion agregarLibro */
    function agregarLibro(){
        imagen.src="agregar.jpg";
        let titulo=document.getElementById("nombre").value;
        let patron=/^[A-Z]+$/;
        if(!titulo.match(patron)){
            texto.innerHTML=`Error en el nombre`;
        }else{
            let planta=document.getElementById("planta").value;
            let numPlanta=b.temas.indexOf(planta);
            if(b.plantallena(numPlanta)){
                texto.innerHTML=`La planta está llena`;
            }else{
                if(b.estalibro(numPlanta,titulo)){
                    texto.innerHTML=`El libro está ya en la planta`;
                }else{
                    b.agregalibro(numPlanta,titulo);
                    texto.innerHTML=`Código libro ${b.plantas[numPlanta].getCodigoLibro(titulo)}`;
                }
            }
        }
    }

    /* funcion librosPlanta */
    function librosPlanta(){
        imagen.src="listado.jpg";
        let planta=document.getElementById("planta").value;
        let numPlanta=b.temas.indexOf(planta);
        texto.innerHTML="";
        if(b.plantas[numPlanta].libros.length==0){
            texto.innerHTML=`Planta Vacía`;
        }else{
            let ul=document.createElement("ul");
            for(let i=0;i<b.plantas[numPlanta].libros.length;i++){
                let li=document.createElement("li");
                li.innerHTML=`${b.plantas[numPlanta].libros[i]}`;
                ul.appendChild(li);
            }
            texto.appendChild(ul);
        }
    }

    /* funcion codigo */
    function codigo(){
        imagen.src="codigo.jpg";
        let planta=document.getElementById("planta").value;
        let numPlanta=b.temas.indexOf(planta);
        let titulo=document.getElementById("nombre").value;
        if(b.plantas[numPlanta].libros.length==0){
            texto.innerHTML=`Planta Vacía`;
        }else{
            if(b.plantas[numPlanta].libros.includes(titulo)){
                texto.innerHTML=b.plantas[numPlanta].getCodigoLibro(titulo);
            }else{
                texto.innerHTML=`El libro no está en la planta`;
            }
        }
    }

    /* funcion buscarLibro */
    function buscarLibro(){
        imagen.src="buscar.jpg";
        let planta=document.getElementById("planta").value;
        let numPlanta=b.temas.indexOf(planta);
        let numero=document.getElementById("numero").value;
        if(numero<0||isNaN(numero)||numero>b.plantas[numPlanta].libros.length){
            texto.innerHTML="Código incorrecto";
        }else{
            texto.innerHTML=b.plantas[numPlanta].libros[numero];
        }
    }
}

window.addEventListener("load",iniciar);