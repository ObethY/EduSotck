function confirm(id,nombre){
    Swal.fire({
        title: "¿Deseas eleminiar el recurso?: "+nombre,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            window.location = '/recurso/delete/'+id+'/'+nombre
        } 
        });
}

function add(){
    Swal.fire({
        html: `
            <div class="tituloFormulario">
                <h1> Agregar Recurso </h1>
            </div>
            <form class="formulario">
                <div  class="caja nombre">
                    <label for="nombre">Nombre del recurso</label>
                    <input type="text" id="nombre" class="input" required>
                </div>

                <div  class="caja estado">
                    <legend>Color</legend>
                    <select id="color" name="color" required>
                        <option slected>Blanco</option>
                        <option >Negro</option>
                        <option >Gris</option>
                        <option >Rojo</option>
                        <option >Azul</option>
                        <option >Verde</option>
                        <option >Amarillo</option>
                        <option >Naranja</option>
                        <option >Cafe</option>
                        <option >Rosado</option>
                        <option >Morado</option>
                    </select>
                </div>  
            
                <div  class="caja marca">
                    <label for="marca">Marca</label>
                    <input type="text" id="marca" class="input" required>
                </div> 

                <div  class="caja estado">
                    <legend>Estado</legend>
                    <select id="estado" required> <!--lista para seleccionar-->
                        <!--opciones-->
                        <option selected>Nuevo</option>
                        <option>Bueno</option> 
                        <option>Regular</option>
                        <option>Malo</option>
                        <option>Cambio urgente</option>
                    </select> 
                </div> 

                <div  class="caja precio">
                    <label for="precio">Precio</label>
                    <input type="number" id="precio" class="input" required >
                </div> 

                <div  class="caja serial">
                    <label for="serial">Numero serial</label>
                    <input type="text" id="serial" class="input" required>
                </div> 

                <div  class="caja serial">
                    <label for="posicion">Posición</label>
                    <input type="text" id="posicion" class="input" required >
                </div> 

                <div  class="caja descripcion">
                    <label for="description">Descripción</label>
                    <textarea name="descripcion" id="descripcion" cols="45" rows="10" required></textarea>
                </div> 
            </form>  
        `,
        showCancelButton: true,
        confirmButtonText: 'Agregar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#4CC9F0',
        cancelButtonColor:'#ef233c',
        customClass: {
            // Define una clase CSS personalizada para esta ventana modal
            container: 'custom-sweet'
          },
        preConfirm: ()=>{
            const nombre = Swal.getPopup().querySelector('#nombre').value
            const color = Swal.getPopup().querySelector('#color').value
            const marca = Swal.getPopup().querySelector('#marca').value
            const estado = Swal.getPopup().querySelector('#estado').value
            const precio = Swal.getPopup().querySelector('#precio').value
            const serial = Swal.getPopup().querySelector('#serial').value
            const posicion = Swal.getPopup().querySelector('#posicion').value
            const descripcion = Swal.getPopup().querySelector('#descripcion').value
            
            if(!nombre || !color || !marca || !estado || !precio || !serial || !posicion || !descripcion){
                Swal.showValidationMessage('Por favor, llena todos los campos');
            }
                return { nombre:nombre, color:color, marca:marca, estado:estado, precio:precio, 
                    serial:serial, posicion:posicion, descripcion:descripcion
                 };
        }
    }).then((result)=>{
        if (result.isConfirmed) {
            // Acciones a realizar si el usuario confirma
            const data = result.value;                        
            
            window.location = '/recurso/save/'+data.nombre+'/'+data.color+'/'+data.marca+'/'+data.estado+
            '/'+data.precio+'/'+data.serial+'/'+data.posicion+'/'+data.descripcion
        }
    });

}

function edit(id,nombre,color,marca,estado,precio,serial,posicion,descripcion){
    Swal.fire({
        html: `
        
        
        <div class="tituloFormulario">
        <h1> Editar Recurso </h1>
    </div>
    <form class="formulario">

        <div  class="caja nombre">
            <input type="text" value="`+id+`" id="id_recurso" class="input" readonly style="display: none;" required>
            <label for="nombre">Nombre del recurso</label>
            <input type="text" value="`+nombre+`" id="nombre" class="input" required>
        </div>

        <div  class="caja estado">
            <legend>Color</legend>
            <select id="color" value="`+color+`" name="color" required>
                <option slected>Blanco</option>
                <option >Negro</option>
                <option >Gris</option>
                <option >Rojo</option>
                <option >Azul</option>
                <option >Verde</option>
                <option >Amarillo</option>
                <option >Naranja</option>
                <option >Cafe</option>
                <option >Rosado</option>
                <option >Morado</option>
            </select>
        </div>  
    
        <div  class="caja marca">
            <label for="marca">Marca</label>
            <input type="text" value="`+marca+`" id="marca" class="input" required>
        </div> 

        <div  class="caja estado">
            <legend>Estado</legend>
            <select value="`+estado+`" id="estado" required> <!--lista para seleccionar-->
                <!--opciones-->
                <option selected>Nuevo</option>
                <option>Bueno</option> 
                <option>Regular</option>
                <option>Malo</option>
                <option>Cambio urgente</option>
            </select> 
        </div> 

        <div  class="caja precio">
            <label for="precio">Precio</label>
            <input type="number" value="`+precio+`" id="precio" class="input" required disabled>
        </div> 

        <div  class="caja serial">
            <label for="serial">Numero serial</label>
            <input type="text" value="`+serial+`" id="serial" class="input" required>
        </div> 

        <div  class="caja serial">
            <label for="posicion">Posición</label>
            <input type="text" value="`+posicion+`" id="posicion" class="input" required >
        </div> 

        <div  class="caja descripcion">
            <label for="description">Descripción</label>
            <textarea name="descripcion"  id="descripcion" cols="45" rows="10" required>${descripcion}</textarea>
        </div> 
    </form>  
       
        ` ,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
       
        preConfirm: ()=>{
            const id_recurso = Swal.getPopup().querySelector('#id_recurso').value 
            const nombre = Swal.getPopup().querySelector('#nombre').value
            const color = Swal.getPopup().querySelector('#color').value
            const marca = Swal.getPopup().querySelector('#marca').value
            const estado = Swal.getPopup().querySelector('#estado').value
            const precio = Swal.getPopup().querySelector('#precio').value
            const serial = Swal.getPopup().querySelector('#serial').value
            const posicion = Swal.getPopup().querySelector('#posicion').value
            const descripcion = Swal.getPopup().querySelector('#descripcion').value
        
            if(!nombre || !color || !marca || !estado || !precio || !serial || !posicion || !descripcion){
                Swal.showValidationMessage('Por favor, llena todos los campos');
            }
                return {id_recurso:id_recurso,nombre:nombre, color:color, marca:marca, estado:estado, precio:precio, 
                    serial:serial, posicion:posicion, descripcion:descripcion
                 };
        }
    }).then((result) => {
        /* Read more isConfirmed, isDenied below */
        if (result.isConfirmed) {
            if (result.isConfirmed) {
            // Acciones a realizar si el usuario confirma
            const data = result.value;                        
            window.location = '/recurso/edit/'+data.id_recurso+'/'+data.nombre+'/'+data.color+'/'+data.marca+'/'+data.estado+
            '/'+data.precio+'/'+data.serial+'/'+data.posicion+'/'+data.descripcion
        }
        } 
        });
}

