function cargarRubros() {
    let rubros = JSON.parse(localStorage.getItem("rubros")) || [];
    let selectRubros = document.getElementById("rubrosSelect");
    let selectVerProductos = document.getElementById("verProductosSelect");
    
    selectRubros.innerHTML = ''; 
    selectVerProductos.innerHTML = ''; 
    selectRubros.innerHTML = '<option value="">Seleccionar Rubro</option>';
    selectVerProductos.innerHTML = '<option value="">Seleccionar Rubro</option>';

    rubros.forEach((rubro, indice) => {
        let opcion = document.createElement("option");
        opcion.value = indice;
        opcion.textContent = rubro;
        selectRubros.appendChild(opcion);
        selectVerProductos.appendChild(opcion.cloneNode(true));
    });
}

function agregarRubro() {
    let inputRubro = document.getElementById("rubro");
    let rubro = inputRubro.value.trim();
    
    if (rubro) {
        let rubros = JSON.parse(localStorage.getItem("rubros")) || [];
        rubros.push(rubro);
        localStorage.setItem("rubros", JSON.stringify(rubros));
        inputRubro.value = '';
        cargarRubros();
    } else {
        alert("Por favor ingrese un nombre para el rubro.");
    }
}

function agregarProducto() {
    let inputProducto = document.getElementById("producto");
    let inputPrecio = document.getElementById("precio");
    let inputStock = document.getElementById("stock");
    let selectRubros = document.getElementById("rubrosSelect");
    let indiceRubro = selectRubros.value;

    if (inputProducto.value.trim() && indiceRubro !== "" && inputPrecio.value && inputStock.value) {
        let productos = JSON.parse(localStorage.getItem("productos")) || [];
        let producto = {
            nombre: inputProducto.value.trim(),
            rubro: indiceRubro,
            precio: parseFloat(inputPrecio.value),
            stock: parseInt(inputStock.value)
        };
        productos.push(producto);
        localStorage.setItem("productos", JSON.stringify(productos));

        inputProducto.value = '';
        inputPrecio.value = '';
        inputStock.value = '';

        mostrarProductosPorRubro();
    } else {
        alert("Por favor ingrese todos los datos del producto.");
    }
}

function mostrarProductosPorRubro() {
    let indiceRubro = document.getElementById("verProductosSelect").value;
    let cuerpoTablaProductos = document.getElementById("productosTableBody");
    let productos = JSON.parse(localStorage.getItem("productos")) || [];
    
    cuerpoTablaProductos.innerHTML = ''; 

    if (indiceRubro) {
        let rubros = JSON.parse(localStorage.getItem("rubros")) || [];
        let rubroSeleccionado = rubros[indiceRubro];
        
        let productosFiltrados = productos.filter(producto => producto.rubro == indiceRubro);

        if (productosFiltrados.length > 0) {
            productosFiltrados.forEach(producto => {
                let tr = document.createElement("tr");
                let tdNombre = document.createElement("td");
                let tdRubro = document.createElement("td");
                let tdPrecio = document.createElement("td");
                let tdStock = document.createElement("td");

                tdNombre.textContent = producto.nombre;
                tdRubro.textContent = rubroSeleccionado;
                tdPrecio.textContent = `$${producto.precio.toFixed(2)}`;
                tdStock.textContent = producto.stock;

                tr.appendChild(tdNombre);
                tr.appendChild(tdRubro);
                tr.appendChild(tdPrecio);
                tr.appendChild(tdStock);

                cuerpoTablaProductos.appendChild(tr);
            });
        } else {
            cuerpoTablaProductos.innerHTML = '<tr><td colspan="4">No hay productos en este rubro.</td></tr>';
        }
    }
}

cargarRubros();