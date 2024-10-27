function confirm(id,nombre){
    Swal.fire({
        title: "¿Deseas eleminiar el salon?: "+nombre,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            window.location = '/salon/delete/'+id
        } 
        });
}

function add(){
    Swal.fire({
        html: `
            <div class="tituloFormulario">
                <h1> Agregar Salon </h1>
            </div>
            <form class="formulario">
                <div  class="caja numero">
                    <label for="nombre">Nombre de salón</label>
                    <input type="text" id="nombreSalon" class="input" required>
                </div>

                <div class="caja capacidad">
                    <label for="capacidad">Capacidad</label>
                    <input type="number" id="capacidadSalon" class="input" required >
                </div>  

                <div class="caja capacidad">
                    <label for="piso">Numero de piso</label>
                <input type="number" id="piso" class="input" required >
            </div>  

            </form>

        `,
        showCancelButton: true,
        confirmButtonText: 'Agregar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#4CC9F0',
        cancelButtonColor:'#ef233c',
        preConfirm: ()=>{
            const nombreSalon = Swal.getPopup().querySelector('#nombreSalon').value;
            const capacidad = Swal.getPopup().querySelector('#capacidadSalon').value;
            const piso = Swal.getPopup().querySelector('#piso').value;
        
            if(!nombreSalon || !capacidad || !piso){
                Swal.showValidationMessage('Por favor, llena todos los campos');
            }
                return { nombreSalon:nombreSalon, capacidad:capacidad, piso:piso };
        }
    }).then((result)=>{
        if (result.isConfirmed) {
            // Acciones a realizar si el usuario confirma
            const data = result.value;                        
            window.location = '/salon/save/'+data.nombreSalon+'/'+data.capacidad+'/'+data.piso
        }
    });

}

function edit(id,nombre,capacidad,piso){
    Swal.fire({
        html: `
        
        <div class="tituloFormulario">
            <h1> Modificar Salon </h1>
        </div>
        <form class="formulario">
        <input type="text" id="id" name="id"  value="`+id+`" readonly style="display: none;">
        <div  class="caja numero">
            <label for="nombreSalon">Nombre de salón</label>
            <input type="text" value="`+nombre+`" id="nombreSalon" class="input" required>
        </div>

        <div class="caja capacidad">
            <label for="capacidadSalon">Capacidad</label>
            <input type="number"  value="`+capacidad+`" id="capacidadSalon" class="input" required >
        </div>  

        <div class="caja capacidad">
            <label for="piso">Numero de piso</label>
        <input type="number" value="`+piso+`" id="piso" class="input" required >
    </div>  

    </form>

       
        ` ,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
        preConfirm: ()=>{
            const id = Swal.getPopup().querySelector('#id').value;
            const nombreSalon = Swal.getPopup().querySelector('#nombreSalon').value;
            const piso = Swal.getPopup().querySelector('#piso').value;
            const capacidad = Swal.getPopup().querySelector('#capacidadSalon').value;
        
            if(!nombreSalon || !piso || !capacidad){
                Swal.showValidationMessage('Por favor, llena todos los campos');
            }
                return { nombreSalon:nombreSalon , piso:piso ,id:id, capacidad:capacidad};
        }
    }).then((result) => {
        if (result.isConfirmed) {
            if (result.isConfirmed) {
            // Acciones a realizar si el usuario confirma
            const data = result.value;                        
            window.location = '/salon/update/'+data.id+'/'+data.nombreSalon+'/'+data.capacidad+'/'+data.piso
        }
        } 
        });
}

