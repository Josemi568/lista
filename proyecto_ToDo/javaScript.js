/*Creamos las variables necesarias para la validadciond el formulario*/
let formulario1 = document.getElementsByTagName("form")[0];
let parrafo = document.getElementById("parrafo");
let enviar1 = document.getElementById("boton1");
const validarC = /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/;
const validarDNI = /^\d{8}[a-zA-Z]$/;


//validamos el formulario para que la contraseña y el DNI cumplan el formato y lo guardamos en localStorage
function validar(event){
    event.preventDefault();
    let password = document.getElementById("contraseña").value;
    let user = document.getElementById("usuario").value;
    let nif = document.getElementById("dni").value;
    let mail = document.getElementById("correo").value;
    if(password.match(validarC) && !password.match(user) && nif.match(validarDNI)){
        const usuarios = {
            usuario:user
        };
        localStorage.setItem("usuario", JSON.stringify(usuarios));
    }else{
        alert("La contrseña no cumple con algunos requisitos o el dni no cumple con lso requisitos")
    }
}

//Le ponemos el evento al boton del formulario para que funcione la funcion validar
enviar1.addEventListener("click",validar);

//ocultamos el primer formulario en el caso de que ya tengamos algun usuario guradado, sino se muestra
if(localStorage.getItem('usuario')==null){
    formulario1.style.display = "block";
}else{
    formulario1.style.display = "none";
    parrafo.innerHTML += "¡Bienvenido "+JSON.parse(localStorage.getItem("usuario")).usuario+"!";
}

/*añadir tareas*/
//cogemos la lsita en la que estaran las tareas
let lista = document.getElementById("result");
//cogemos el botos de enviar
let enviar2 = document.getElementById("boton2");
let nuevaTarea;

/**
 * obtiene el nombre de la tarea y crea un objeto con el nombre y la hora a la que se introdujo
 * @param {event} e 
 */

function obtener(e){
    let fecha = new Date();
    e.preventDefault();
    function Tarea(nombre, inicio){
        this.nombre = nombre;
        this.inicio = inicio;
    }

    let nombreT = document.getElementById("addTareas").value;
    let fechaT = fecha.getHours()+":"+fecha.getMinutes()+":"+fecha.getSeconds();

    nuevaTarea= new Tarea(nombreT,fechaT);
    addTareas(nuevaTarea);
}
/**
 * añade al array toDo la tarea obtenida y la gurda en el localStorage
 * @param {Tarea} tarea 
 */
function addTareas(tarea){
    let toDo = JSON.parse(localStorage.getItem("tareas"));
    if(toDo==null){
        toDo=[];
    }
    if(toDo.find(t => t.nombre==tarea.nombre)){
        alert("ya existe esa tarea");
    }else{
        toDo.push(tarea);
        localStorage.setItem("tareas",JSON.stringify(toDo));
        location.reload();
    }
}

/**
 * Funcion para eliminar la tarea de Tareas y gurdarla en el LocalStorage TareasELiminadas
 */
function eliminar(e){
    let tarea = JSON.parse(localStorage.getItem("tareas"));
    let valorT = e.target.innerHTML.split("-")[0].trimEnd();
    for (let i=0; i<tarea.length; i++){
        if(tarea[i].nombre==valorT){
            tarea.splice(i, 1);
        }
    }
    let tElim = JSON.parse(localStorage.getItem("tareasEliminadas"));
    if(tElim==null){
        tElim=[];
    }
    tElim.push(valorT);
    localStorage.setItem("tareasEliminadas",JSON.stringify(tElim));
    localStorage.setItem("tareas",JSON.stringify(tarea));
    location.reload()
}

/**
 * Funcion que muestra la tarea y el tiempo en la que se introdujo
 */
function mostrar(){
    let tareas = JSON.parse(localStorage.getItem("tareas"));
    let resultado = document.getElementById("result");
    for( let i=0; i<tareas.length; i++){
        resultado.innerHTML += "<li>"+tareas[i].nombre+" - "+tareas[i].inicio+"</li>"
    }
}

/**
 * Funcion que muestra un contador con todas las tareas
 */
function contador(){
    let cuenta = document.getElementById("contador");
    let contador = JSON.parse(localStorage.getItem("tareas"));
    cuenta.innerHTML = contador.length;
}

/**
 * Funcion que cambia las tareas al pasar el raton sobre ellas
 */
function marcarTarea(e){
    e.target.style.color = "red";
    e.target.style.textDecoration = "line-through";
}

/**
 * Fundion que vuelve a la normalidad las tareas que ha sido marcadas 
 */
function desmarcarTarea(e){
    e.target.style.color = "black";
    e.target.style.textDecoration = "none";
}

//mostramos las distintas tareas y cuantas hay 
if(localStorage.getItem("tareas")!==null){
    document.getElementById("result").style.display="block";
    mostrar();
    contador();
}
//creamos todos los eventos que necesita la pagina
enviar2.addEventListener("click",obtener);
lista.addEventListener("mouseover",marcarTarea);
lista.addEventListener("mouseout",desmarcarTarea);
lista.addEventListener("click",eliminar);
//mostramos las tareas que han sido eliminadas por consola
console.log(localStorage.getItem("tareasEliminadas"));

/* Busqueda de una tarea */
//guardamos el buscador en una variable
let buscador = document.getElementById("buscaTarea");
//guardaos un parrafo que usaremos para mostrar las tareas
let parrafoB = document.getElementById("busca");

/**
 * Funncion que muestra las tareas al buscar en un buscador
 * @param {*} event 
 */
function buscar(event){
    let letra = event.target.value;
    let tareas = JSON.parse(localStorage.getItem("tareas"));

    for(let i=0; i<tareas.length; i++){
        if(tareas[i].nombre.includes(letra)){
            parrafoB.innerHTML = "<p>"+tareas[i].nombre+"</p>";
        }
    }
}

//le poenemos el evento al buscador para que detecte las letras pulsadas
buscador.addEventListener("keydown",buscar);
