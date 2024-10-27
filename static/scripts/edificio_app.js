function confirm(id,nombre){
    Swal.fire({
        title: "¿Deseas eleminiar el elemento?: "+nombre,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            window.location = '/edificio/delete/'+id
        } 
        });
}

function add(){
    Swal.fire({
        html: `

        <div class="tituloFormulario">
                <h1> Agregar Edificio </h1>
        </div>

        <form class="formulario" id="formularioEdificio"> <!--formulario-->
                <div class="caja nombre"> <!--padre caja, hijo nombre (se pueden llamar por separado)-->
                    <label for="nombreEdificio">Nombre del Edificio </label>
                    <input type="text" id="nombreEdificio" class="input" placeholder="Nombre Edificio" required>
                </div>

                <div class="plantas"><!--la caja continene el label y el input-->
                    <label for="Numero de plantas">Numero de plantas</label>
                    <input type="number" id="planta" class="input" placeholder="Numero de plantas" required>
                </div>
            </form>

        `,
        showCancelButton: true,
        confirmButtonText: 'Agregar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#4CC9F0',
        cancelButtonColor:'#ef233c',
        preConfirm: ()=>{
            const nombreEdificio = Swal.getPopup().querySelector('#nombreEdificio').value;
            const planta = Swal.getPopup().querySelector('#planta').value;
        
            if(!nombreEdificio || !planta){
                Swal.showValidationMessage('Por favor, llena todos los campos');
            }
                return { nombreEdificio:nombreEdificio , planta:planta };
        }
    }).then((result)=>{
        if (result.isConfirmed) {
            // Acciones a realizar si el usuario confirma
            const data = result.value;                        
            window.location = '/edificio/save/'+data.nombreEdificio+'/'+data.planta
        }
    });
}

function edit(id,nombre,planta){
    Swal.fire({
        html: `
        
         <div class="tituloFormulario">
                <h1> Modificiar Edificio </h1>
        </div>

        <form class="formulario" id="formularioEdificio"> <!--formulario-->
                
                    <input type="text" id="id" value="`+id+`" class="input" placeholder="Nombre Edificio" required readonly style="display: none;">

                <div class="caja nombre"> <!--padre caja, hijo nombre (se pueden llamar por separado)-->
                    <label for="nombreEdificio">Nombre del Edificio </label>
                    <input type="text" value="`+nombre+`" id="nombreEdificio" class="input" placeholder="Nombre Edificio" required>
                </div>

                <div class="plantas"><!--la caja continene el label y el input-->
                    <label for="Numero de plantas">Numero de plantas</label>
                    <input type="number" value="`+planta+`" id="planta" class="input" placeholder="Numero de plantas" required>
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
            const nombreEdificio = Swal.getPopup().querySelector('#nombreEdificio').value;
            const planta = Swal.getPopup().querySelector('#planta').value;
        
            if(!nombreEdificio || !planta){
                Swal.showValidationMessage('Por favor, llena todos los campos');
            }
                return { nombreEdificio:nombreEdificio, planta:planta ,id:id};
        }
    }).then((result) => {
        /* Read more isConfirmed, isDenied below */
        if (result.isConfirmed) {
            if (result.isConfirmed) {
            // Acciones a realizar si el usuario confirma
            const data = result.value;                        
            window.location = '/edificio/update/'+data.id+'/'+data.nombreEdificio+'/'+data.planta
        }
        } 
        });
}