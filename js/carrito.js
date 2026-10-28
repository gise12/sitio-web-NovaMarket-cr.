
document.addEventListener("DOMContentLoaded", function () {
    const carrito = document.querySelector(".carrito-compras");
    const contenedorCarrito = document.getElementById("carritoCompras");
    const totalCarrito = document.getElementById("totalCarrito");
    const botonComprar = document.getElementById("comprarCarrito");
    const mensajeCompra = document.getElementById("mensajeCompra");

    if (!carrito || !contenedorCarrito) {
        return;
    }

    let productosCarrito = [];

    // Crear el botón del carrito en la esquina superior derecha
    const botonAbrirCarrito = document.createElement("button");
    botonAbrirCarrito.className = "boton-abrir-carrito";
    botonAbrirCarrito.type = "button";
    botonAbrirCarrito.innerHTML =
        '🛒 <span class="contador-carrito" id="contadorCarrito">0</span>';
    botonAbrirCarrito.setAttribute(
        "aria-label",
        "Abrir carrito de compras"
    );

    document.body.appendChild(botonAbrirCarrito);

    const contadorCarrito = document.getElementById("contadorCarrito");

    // Ocultar el carrito hasta que se presione el botón
    carrito.style.display = "none";

    botonAbrirCarrito.addEventListener("click", function () {
        carrito.style.display =
            carrito.style.display === "none" ? "block" : "none";
    });

    // Mostrar los productos y actualizar el total
    function actualizarCarrito() {
        contenedorCarrito.innerHTML = "";

        if (productosCarrito.length === 0) {
            contenedorCarrito.innerHTML =
                '<p class="carrito-vacio">Tu carrito está vacío.</p>';
        }

        productosCarrito.forEach(function (producto, indice) {
            const elemento = document.createElement("div");
            elemento.className = "item-carrito";

            const nombre = document.createElement("p");
            nombre.textContent = producto.nombre;
            nombre.style.fontWeight = "bold";

            const precio = document.createElement("p");
            precio.textContent =
                "Precio: ₡" + producto.precio.toLocaleString("es-CR");

            const cantidad = document.createElement("p");
            cantidad.textContent = "Cantidad: " + producto.cantidad;

            const subtotal = document.createElement("p");
            subtotal.textContent =
                "Subtotal: ₡" +
                (producto.precio * producto.cantidad).toLocaleString("es-CR");

            const botonMenos = document.createElement("button");
            botonMenos.type = "button";
            botonMenos.textContent = "−";
            botonMenos.className = "boton-cantidad";
            botonMenos.setAttribute("aria-label", "Disminuir cantidad");

            botonMenos.addEventListener("click", function () {
                producto.cantidad--;

                if (producto.cantidad <= 0) {
                    productosCarrito.splice(indice, 1);
                }

                actualizarCarrito();
            });

            const botonMas = document.createElement("button");
            botonMas.type = "button";
            botonMas.textContent = "+";
            botonMas.className = "boton-cantidad";
            botonMas.setAttribute("aria-label", "Aumentar cantidad");

            botonMas.addEventListener("click", function () {
                producto.cantidad++;
                actualizarCarrito();
            });

            const botonQuitar = document.createElement("button");
            botonQuitar.type = "button";
            botonQuitar.textContent = "Quitar";
            botonQuitar.className = "boton-cantidad";

            botonQuitar.addEventListener("click", function () {
                productosCarrito.splice(indice, 1);
                actualizarCarrito();
            });

            elemento.appendChild(nombre);
            elemento.appendChild(precio);
            elemento.appendChild(cantidad);
            elemento.appendChild(subtotal);
            elemento.appendChild(botonMenos);
            elemento.appendChild(botonMas);
            elemento.appendChild(botonQuitar);

            contenedorCarrito.appendChild(elemento);
        });

        const total = productosCarrito.reduce(function (suma, producto) {
            return suma + producto.precio * producto.cantidad;
        }, 0);

        const cantidadTotal = productosCarrito.reduce(function (suma, producto) {
            return suma + producto.cantidad;
        }, 0);

        totalCarrito.textContent =
            "Total: ₡" + total.toLocaleString("es-CR");

        contadorCarrito.textContent = cantidadTotal;
        botonComprar.disabled = productosCarrito.length === 0;
    }

    // Agregar productos desde las tarjetas
    document.querySelectorAll(".boton-agregar-carrito").forEach(function (boton) {
        boton.addEventListener("click", function () {
            const nombre = boton.dataset.producto;
            const precio = Number(
                boton.dataset.precio.replace(/[^\d]/g, "")
            );

            if (!nombre || !Number.isFinite(precio) || precio <= 0) {
                alert("No se pudo agregar el producto. Revisa su nombre y precio.");
                return;
            }

            const productoExistente = productosCarrito.find(function (producto) {
                return producto.nombre === nombre;
            });

            if (productoExistente) {
                productoExistente.cantidad++;
            } else {
                productosCarrito.push({
                    nombre: nombre,
                    precio: precio,
                    cantidad: 1
                });
            }

            mensajeCompra.textContent = "";
            actualizarCarrito();
        });
    });

    // Simular la compra
    botonComprar.addEventListener("click", function () {
        if (productosCarrito.length === 0) {
            return;
        }

        alert("¡Gracias por comprar en NovaMarket CR!");

        productosCarrito = [];
        mensajeCompra.textContent = "¡Compra realizada correctamente!";
        actualizarCarrito();
    });

    actualizarCarrito();
});
