const agregar = document.getElementById('agregar'); 
const form_container = document.getElementById('form_container'); 
const form_editar = document.getElementById('form_editar'); 
const agregarBD = document.getElementById('agregarBD'); 
const editarBD = document.getElementById('editarBD'); 
const cancelar = document.getElementById('cancelar'); 
const cancelarEditar = document.getElementById('cancelarEditar'); 
const eliminarNo = document.getElementById('eliminarNo'); 
const eliminarSi = document.getElementById('eliminarSi'); 

agregar.addEventListener('click',() =>{
    form_container.classList.add('show');
}); 

cancelar.addEventListener('click', () =>{
    form_container.classList.remove('show');
    limpiarFormulario();
});

cancelarEditar.addEventListener('click', () =>{
    form_editar.classList.remove('show');
});

//Agrega los salones

let contador = 0; 

function agregarSalon(numero, capacidad, planta, numeroPiso) { 
    contador++; 

    const divSalon = document.createElement("div"); //crea un div en el html por cada instituto nuevo
    divSalon.classList.add("listaElemento", "description"); //se le crea los estilos
    divSalon.innerHTML = `
        <h2>${numero}</h2>
        <img src="../imagenes/salon.png">
        <p class="description">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi ea tenetur debitis excepturi doloribus! Distinctio iusto officiis aliquid beatae earum veritatis quibusdam debitis ex, quas sed recusandae eveniet? Eaque, sed!e</p>
        <div class="accionLista">
            <button class="botonIcono icono" id="editarIcono">
                <img src="../imagenes/editar.png" alt="Boton para editar el contenido de la tabla">
            </button>
            <button class="botonIcono icono" id="borrarIcono">    
                <img src="../imagenes/borrar.png" alt="Boton para borrar el contenido de la tabla">
            </button>
        </div>

    `;//se establce el contenido del html

    document.getElementById("contenedor").appendChild(divSalon); //al div de contenedor se le va a agregar el divSalon

    document.getElementById("editarIcono").addEventListener("click", function(){       
        form_editar.classList.add('show');
    });
    
    document.getElementById("borrarIcono").addEventListener("click", function(){ 
        const form_eliminar = document.getElementById('eliminarVentana');
        form_eliminar.classList.add('show');
    });
    
    document.getElementById("eliminarSi").addEventListener("click", function(){ /*escucha el click SI y lo elimina de la BD */
        const form_eliminar = document.getElementById('eliminarVentana');
        alert('eliminado'); /* poner lo que se necesita para borrar*/   
        form_eliminar.classList.remove('show');       
    });
    
    document.getElementById("eliminarNo").addEventListener("click", function(){ /*escucha el click NO quita la ventana modal */
        const form_eliminar = document.getElementById('eliminarVentana');
        form_eliminar.classList.remove('show'); 
    }); 


}

document.getElementById("agregarBD").addEventListener("click", function(){ 
   
    const numero = document.getElementById("numeroSalon").value;
    const capacidad = document.getElementById("capacidadSalon").value;
    const planta = document.getElementById("selectPiso").value; //se obtiene el select del numero de planta
    const numeroPiso = document.getElementById("numeroPiso").value; /*se obtiene el numero de piso en casa de que se haya seleccionado otro en planta */

    if(validarFormulario()){
        agregarSalon(numero, capacidad, planta, numeroPiso);//se ejecuta la funcion
        form_container.classList.remove('show');
        event.preventDefault(); /*puede qu genere ERROR, despues, si se quita el contenedor del instituto solo se ve por un segundo  */
    }

     limpiarFormulario();
 
});

document.getElementById("editarBD").addEventListener("click", function(){ 
   
    const numero = document.getElementById("numeroSalon").value;
    const capacidad = document.getElementById("capacidadSalon").value;
    const planta = document.getElementById("selectPiso").value; //se obtiene el select del numero de planta
    const numeroPiso = document.getElementById("numeroPiso").value; /*se obtiene el numero de piso en casa de que se haya seleccionado otro en planta */

    if(validarFormulario()){
         /*agregar los cambios para editar de la BD*/
        form_container.classList.remove('show');
        /*quita el salon :( ERRORRRR */
    }

     limpiarFormulario();
 
});



//Funcion para agregar un input al dar otra en planta

var selectPiso = document.getElementById("selectPiso"); //obtener el valor del select
var inputNumeroPiso = document.getElementById("numeroPiso"); //obtener el numero de piso
var mensajeError = document.getElementById("mensajeError");//muestra el mensaje de error

//evento change es del select cuando cambia 
selectPiso.addEventListener('change', function(){ //obtenemos el evento de seleccion 
    if (this.value=='Otro'){ //si el valor que se obtiene del select es igual a otro
        inputNumeroPiso.style.display = 'block'; //agregamos el input para obtener el numero del piso
    }else{ //si no pasa no se ve el input
        inputNumeroPiso.style.display = 'none';
        mensajeError.style.display = 'none';
    }
});

//de la misma funcion hacemosla validacion de los pisos

inputNumeroPiso.addEventListener('input', function(){ 
    var numeroPiso = parseInt(this.value); //obtemos el numero de piso 
    if(numeroPiso < 2){ //lo comparamos para evitar errores
        mensajeError.style.display = 'block';
    }else{
        mensajeError.style.display = 'none';
    } 

});

function validarFormulario() { 
    const numero = document.getElementById("numeroSalon").value;
    const capacidad = document.getElementById("capacidadSalon").value;
    const planta = document.getElementById("selectPiso").value; 
    const numeroPiso = document.getElementById("numeroPiso").value; 

    if (numero === "" || capacidad === "" || planta === "") { 
        return false; // Detener el envío del formulario si hay uno mal
    }
    return true; // Si los campos no están vacíos, permitir el envío del formulario
}

function limpiarFormulario (){
    document.getElementById("numeroSalon").value = ""; //limpia las cajas del formulario
    document.getElementById("capacidadSalon").value = "";
    document.getElementById("selectPiso").value = "";
    ocument.getElementById("numeroPiso").value = "";
}