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

//Agregar salon

let contador = 0; //numero de institutos agregados

function agregarRecurso(nombre,posicion, serial, marca, color, precio,estado,description) {
    contador++; 

    const fila = document.createElement("tr"); //crea un tr en el html por cada instituto nuevo
    fila.classList.add("tablaBody", ".tablaSection", "table", "th,td"); //se le crea los estilos
    fila.innerHTML = `
        <td>${nombre}</td>
        <td>${posicion}</td>
        <td>${serial}</td>
        <td>${marca}</td>
        <td>${color}</td>
        <td>${precio}</td>
        <td>${estado}</td>
        <td>${description}</td>
        <td >
            <div class="contenedorAcciones">
                <button class="botonIcono icono" id="editarIcono">
                    <img src="../imagenes/editar.png" alt="Editar contenido">
                </button>
                <button class="botonIcono icono" id="borrarIcono">    
                    <img src="../imagenes/borrar.png" alt="Borrar el contenido">
                </button>
            </div>
        </td>

    `;//se establce el contenido del html

    document.getElementById("tbodyRecursos").appendChild(fila); //se agrega al tr

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
    const nombre = document.getElementById("nombreRecurso").value;
    const posicion = document.getElementById("posicionRecurso").value;
    const serial = document.getElementById("serialRecurso").value;
    const marca = document.getElementById("marcaRecurso").value;
    const color = document.getElementById("colorRecurso").value;
    const precio = document.getElementById("precioRecurso").value;
    const estado = document.getElementById("estadoRecurso").value;
    const description = document.getElementById("descripcionRecurso").value;
    
    if(validarFormulario()){
        agregarRecurso(nombre,posicion, serial, marca, color, precio,estado,description); //se ejecuta la funcion
        form_container.classList.remove('show');
        event.preventDefault();
    }
    limpiarFormulario();
});

document.getElementById("editarBD").addEventListener("click", function(){ 
    const nombre = document.getElementById("nombreRecurso").value;
    const posicion = document.getElementById("posicionRecurso").value;
    const serial = document.getElementById("serialRecurso").value;
    const marca = document.getElementById("marcaRecurso").value;
    const color = document.getElementById("colorRecurso").value;
    const precio = document.getElementById("precioRecurso").value;
    const estado = document.getElementById("estadoRecurso").value;
    const description = document.getElementById("descripcionRecurso").value;

    
    if(validarFormulario()){
        form_editar.classList.remove('show');
        /*quita el recurso :( ERRORRRR */
    }
    limpiarFormulario();
});

function validarFormulario() { //Validar formulario 
    const nombre = document.getElementById("nombreRecurso").value;
    const posicion = document.getElementById("posicionRecurso").value;
    const serial = document.getElementById("serialRecurso").value;
    const marca = document.getElementById("marcaRecurso").value;
    const color = document.getElementById("colorRecurso").value;
    const precio = document.getElementById("precioRecurso").value;
    const estado = document.getElementById("estadoRecurso").value;
    const deasscripcion = document.getElementById("descripcionRecurso").value;
    
    if (nombre === "" || posicion === "" || serial === "" || marca === "" || color === "" || precio === "" || estado === "" || deasscripcion === "") { 
        return false; // Detener el envío del formulario si hay uno mal
    }
    return true; // Si los campos no están vacíos, permitir el envío del formulario
}

function limpiarFormulario(){
    document.getElementById("nombreRecurso").value = "";
    document.getElementById("posicionRecurso").value = "";
    document.getElementById("serialRecurso").value= "";
    document.getElementById("marcaRecurso").value= "";
    document.getElementById("colorRecurso").value= "";
    document.getElementById("precioRecurso").value= "";
    document.getElementById("estadoRecurso").value= "";
    document.getElementById("descripcionRecurso").value = "";
}