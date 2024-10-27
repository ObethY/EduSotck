function confirm(id,nombre){
    Swal.fire({
        title: "¿Deseas eleminiar el usuaro?: "+nombre,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            window.location = '/delete/'+id
        } 
        });
}

function add() {
    Swal.fire({
        html: `
        <br>
        <br>
            <div class="tituloFormulario">
                <h1>Agregar usuario</h1>
            </div>
            <form method="POST" action="/registarUsuario" class="formulario">
                <div class="caja nombre">   
                    <label for="nombre">Nombre(s)</label> 
                    <input type="text" id="nombre" name="nombre" class="input" required>
                </div>
                <div class="caja capacidad">
                    <label for="apellido">Apellidos</label> 
                    <input type="text" id="apellido" name="apellido" class="input" required>
                </div>
                <div class="caja estado">
                    <legend>Rol</legend>
                    <select id="rol" name="rol" required>
                        <option value="Lector" selected>Lector</option>
                        <option value="Editor">Editor</option>
                        <option value="Administrador">Administrador</option>
                    </select>
                </div>  
                <div class="caja nombre">
                    <label for="matricula">No. cuenta</label> 
                    <input type="number" id="matricula" name="matricula" class="input" required>
                </div>
                <div class="caja nombre">
                    <label for="email">Correo electronico</label> 
                    <input type="email" id="email" name="email" class="input" required placeholder="email@uaeh.edu.mx">
                </div>
                <div> 
                    <label for="contrasenia">Contraseña</label> 
                    <input type="password" id="contrasenia" name="contrasenia" class="input" required placeholder="********">
                </div>

                <input type="hidden" id="ventana" name="ventana" value="si">
                
                <div class="caja botonAccion">
                    <div class="accion">
                        <input type="submit" value="Agregar" class="boton agregar" id="agregarBD">
                    </div>  
                </div> 
            </form>
        `,
        showCloseButton: true,
        showCancelButton: false,
        showConfirmButton: false,
    })
}

function edit(id, nombre, apellido, rol, contrasenia, matricula, correo) {
    console.log(id, nombre, apellido, rol, contrasenia, matricula, correo)
    Swal.fire({
        html: `
        <br>
        <br>
            <div class="tituloFormulario">
                <h1>Editar usuario</h1>
            </div>
            <form method="POST" action="/editarUsuario" class="formulario">
                <input value="${id}" type="hidden" id="id_usuario" name="id_usuario">
                <div class="caja nombre">   
                    <label for="nombre">Nombre(s)</label> 
                    <input type="text" value="${nombre}" id="nombre" name="nombre" class="input" required>
                </div>
                <div class="caja capacidad">
                    <label for="apellido">Apellidos</label> 
                    <input type="text" value="${apellido}" id="apellido" name="apellido" class="input" required>
                </div>
                <div class="caja estado">
                    <legend>Rol</legend>
                    <select id="rol" name="rol" required>
                        <option value="Lector" ${rol === "Lector" ? "selected" : ""}>Lector</option>
                        <option value="Editor" ${rol === "Editor" ? "selected" : ""}>Editor</option>
                        <option value="Administrador" ${rol === "Administrador" ? "selected" : ""}>Administrador</option>
                    </select>
                </div>  
                <div class="caja nombre">
                    <label for="matricula">No. cuenta</label> 
                    <input type="number" value="${matricula}" id="matricula" name="matricula" class="input" required>
                </div>
                <div class="caja nombre">
                    <label for="email">Correo electronico</label> 
                    <input type="email" value="${correo}" id="email" name="email" class="input" required placeholder="email@uaeh.edu.mx">
                </div>
                <div> 
                    <label for="contrasenia">Contraseña</label> 
                    <input type="password" value="${contrasenia}" id="contrasenia" name="contrasenia" class="input" required placeholder="********">
                </div>
                
                <div class="caja botonAccion">
                    <div class="accion">
                        <input type="submit" value="Editar" class="boton agregar" id="agregarBD">
                    </div>  
                </div> 
            </form>
        `,
        showCloseButton: true,
        showCancelButton: false,
        showConfirmButton: false,
    });
}

