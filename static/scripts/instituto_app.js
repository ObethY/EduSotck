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
                        window.location = '/instituto/delete/'+id
                    } 
                    });
            }

            function add(){
                Swal.fire({
                    html: `

                    <div class="tituloFormulario">
                            <h1> Agregar instituto </h1>
                    </div>

                    <form class="formulario" id="formularioInstituto"> <!--formulario-->
                            <div class="caja nombre"> <!--padre caja, hijo nombre (se pueden llamar por separado)-->
                                <label for="nombre">Nombre del instituto </label>
                                <input type="text" id="nombreInstituto" class="input" placeholder="Nombre" required>
                            </div>

                            <div class="caja ubicacion"><!--la caja continene el label y el input-->
                                <label for="direccion">Dirección</label>
                                <input type="text" id="direccion" class="input" placeholder="Direccion" required>
                            </div>
                        </form>

                    `,
                    showCancelButton: true,
                    confirmButtonText: 'Agregar',
                    cancelButtonText: 'Cancelar',
                    confirmButtonColor: '#4CC9F0',
                    cancelButtonColor:'#ef233c',
                    preConfirm: ()=>{
                        const nombreInstituto = Swal.getPopup().querySelector('#nombreInstituto').value;
                        const direccion = Swal.getPopup().querySelector('#direccion').value;
                    
                        if(!nombreInstituto || !direccion){
                            Swal.showValidationMessage('Por favor, llena todos los campos');
                        }
                            return { nombreInstituto:nombreInstituto, direccion:direccion };
                    }
                }).then((result)=>{
                    if (result.isConfirmed) {
                        // Acciones a realizar si el usuario confirma
                        const data = result.value;                        
                        window.location = '/instituto/save/'+data.nombreInstituto+'/'+data.direccion
                    }
                });
            }

            function edit(id,nombre,direccion){
                Swal.fire({
                    title: "Modificando elemento",
                    html: `

                    <form class="formulario" > <!--formulario-->
                        <input type="text" id="id" name="id"  value="`+id+`" readonly style="display: none;">
                        <div  class="caja nombre"> <!--padre caja, hijo nombre (se pueden llamar por separado)-->
                            <label for="nombreInstituto">Nombre del instituto </label>
                            <input type="text" id="nombreInstituto" name="nombreInstituto" class="input" value="`+nombre+`">
                        </div>

                        <div  class="caja ubicacion"><!--la caja continene el label y el input-->
                            <label for="direccion">Dirección</label>
                            <input type="text" id="direccion" name="direccion" class="input" value="`+direccion+`">
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
                        const nombreInstituto = Swal.getPopup().querySelector('#nombreInstituto').value;
                        const direccion = Swal.getPopup().querySelector('#direccion').value;
                    
                        if(!nombreInstituto || !direccion){
                            Swal.showValidationMessage('Por favor, llena todos los campos');
                        }
                            return { nombreInstituto:nombreInstituto, direccion:direccion ,id:id};
                    }
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        if (result.isConfirmed) {
                        // Acciones a realizar si el usuario confirma
                        const data = result.value;                        
                        window.location = '/instituto/update/'+data.id+'/'+data.nombreInstituto+'/'+data.direccion
                    }
                    } 
                    });
            }