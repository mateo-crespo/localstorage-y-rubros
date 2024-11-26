// Función para cargar los rubros desde localStorage
function cargarRubros() {
    let rubros = JSON.parse(localStorage.getItem("rubros")) || [];
    const rubrosSelect = document.getElementById("rubrosSelect");
    const verProductosSelect = document.getElementById("verProductosSelect");
    
    rubrosSelect.innerHTML = ''; // Limpiar el select de rubros
    verProductosSelect.innerHTML = ''; // Limpiar el select de ver productos
    rubrosSelect.innerHTML = '<option value="">Seleccionar Rubro</option>';
    verProductosSelect.innerHTML = '<option value="">Seleccionar Rubro</option>';

    rubros.forEach((rubro, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = rubro;
        rubrosSelect.appendChild(option);
        verProductosSelect.appendChild(option.cloneNode(true));
    });
}

// Función para agregar un rubro
function agregarRubro() {
    const rubroInput = document.getElementById("rubro");
    const rubro = rubroInput.value.trim();
    
    if (rubro) {
        let rubros = JSON.parse(localStorage.getItem("rubros")) || [];
        rubros.push(rubro);
        localStorage.setItem("rubros", JSON.stringify(rubros));
        rubroInput.value = '';
        cargarRubros();
    } else {
        alert("Por favor ingrese un nombre para el rubro.");
    }
}

// Función para agregar un producto
function agregarProducto() {
    const productoInput = document.getElementById("producto");
    const precioInput = document.getElementById("precio");
    const stockInput = document.getElementById("stock");
    const rubrosSelect = document.getElementById("rubrosSelect");
    const rubroIndex = rubrosSelect.value;

    if (productoInput.value.trim() && rubroIndex !== "" && precioInput.value && stockInput.value) {
        let productos = JSON.parse(localStorage.getItem("productos")) || [];
        const producto = {
            nombre: productoInput.value.trim(),
            rubro: rubroIndex,
            precio: parseFloat(precioInput.value),
            stock: parseInt(stockInput.value)
        };
        productos.push(producto);
        localStorage.setItem("productos", JSON.stringify(productos));

        // Limpiar campos
        productoInput.value = '';
        precioInput.value = '';
        stockInput.value = '';

        mostrarProductosPorRubro();
    } else {
        alert("Por favor ingrese todos los datos del producto.");
    }
}

// Función para mostrar productos por rubro en la tabla
function mostrarProductosPorRubro() {
    const rubroIndex = document.getElementById("verProductosSelect").value;
    const productosTableBody = document.getElementById("productosTableBody");
    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    
    productosTableBody.innerHTML = ''; // Limpiar la tabla de productos

    if (rubroIndex) {
        const rubros = JSON.parse(localStorage.getItem("rubros")) || [];
        const rubroSeleccionado = rubros[rubroIndex];
        
        const productosFiltrados = productos.filter(producto => producto.rubro == rubroIndex);

        if (productosFiltrados.length > 0) {
            productosFiltrados.forEach(producto => {
                const tr = document.createElement("tr");
                const tdNombre = document.createElement("td");
                const tdRubro = document.createElement("td");
                const tdPrecio = document.createElement("td");
                const tdStock = document.createElement("td");

                tdNombre.textContent = producto.nombre;
                tdRubro.textContent = rubroSeleccionado;
                tdPrecio.textContent = `$${producto.precio.toFixed(2)}`;
                tdStock.textContent = producto.stock;

                tr.appendChild(tdNombre);
                tr.appendChild(tdRubro);
                tr.appendChild(tdPrecio);
                tr.appendChild(tdStock);

                productosTableBody.appendChild(tr);
            });
        } else {
            productosTableBody.innerHTML = '<tr><td colspan="4">No hay productos en este rubro.</td></tr>';
        }
    }
}

// Cargar los rubros y productos al inicio
cargarRubros();
