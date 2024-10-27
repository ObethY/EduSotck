const agregar = document.getElementById('agregar'); //trae boton de icono de agregar
const form_container = document.getElementById('form_container'); //trae todo lo que esta abajo del modal
const form_editar = document.getElementById('form_editar'); //trae todo lo que esta abajo del modal de editar
const agregarBD = document.getElementById('agregarBD'); //trae lo que contiene el boton de agregar que esta en la modal
const editarBD = document.getElementById('editarBD'); //trae lo que contiene el boton de ACEPTAR que esta en la modal de editar
const cancelar = document.getElementById('cancelar'); //trae lo que contiene el boton de cancelar que esta en la modal
const cancelarEditar = document.getElementById('cancelarEditar'); //trae lo que contiene el boton de cancelar que esta en la modal de editar
const eliminarNo = document.getElementById('eliminarNo'); //trae lo que contiene el boton de no que esta en la modal de eliminar
const eliminarSi = document.getElementById('eliminarSi'); //trae lo que contiene el boton de si que esta en la modal de eliminar

agregar.addEventListener('click',() =>{
    form_container.classList.add('show');
}); //si se da el evento de click se muestra la ventana modal

cancelar.addEventListener('click', () =>{
    form_container.classList.remove('show');
    limpiarFormulario();
}); //quita la ventana modadl

cancelarEditar.addEventListener('click', () =>{
    form_editar.classList.remove('show');
}); //quita la ventana modal de editar

//Agregar institutos

let contador = 0; //numero de institutos agregados

function agregarEdificio(nombre) { //agrega un nuevo instituto al html
    contador++; 

    const divEdificio = document.createElement("div"); //crea un div en el html por cada instituto nuevo
    divEdificio.classList.add("listaElemento", "description"); //se le crea los estilos
    divEdificio.innerHTML = `
        <h2>${nombre}</h2>
        <img src="../imagenes/edificio.png">
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
    document.getElementById("contenedor").appendChild(divEdificio);
    document.getElementById("editarIcono").addEventListener("click", function(){ /* si se da editar, aparece la ventana modal para poder editar*/       
        form_editar.classList.add('show');
    });
    
    document.getElementById("borrarIcono").addEventListener("click", function(){ /*trae la ventana modal de eliminar */
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

// Event listener para el botón
document.getElementById("agregarBD").addEventListener("click", function(){ //escucha el elemento con el id y ejecuta la funcion

    const nombre = document.getElementById("nombreEdificio").value;
 
    if(validarFormulario()){
        agregarEdificio(nombre); //se ejecuta la funcion
        form_container.classList.remove('show'); //si no hay error quita el modal
        event.preventDefault(); /*puede qu genere ERROR, despues, si se quita el contenedor del instituto solo se ve por un segundo  */
    }
    
    limpiarFormulario();

});

document.getElementById("editarBD").addEventListener("click", function(){ //escucha el elemento con el id y ejecuta la funcion
    const nombre = document.getElementById("nombreEdificio").value;
 
    if(validarFormulario()){
        form_container.classList.remove('show'); //si no hay error quita el modal
    }
    limpiarFormulario();
});

function validarFormulario() { //Validar formulario 
    const nombre = document.getElementById("nombreEdificio").value;
    
    if (nombre === "") { // Verificar si los campos están vacíos
        return false; // Detener el envío del formulario si hay uno mal
    }
    return true; // Si los campos no están vacíos, permitir el envío del formulario
}

function limpiarFormulario(){
    document.getElementById("nombreEdificio").value = ""; //limpia las cajas del formulario
}