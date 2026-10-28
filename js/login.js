const formulario = document.getElementById("formLogin");
const campoUsuario = document.getElementById("username");
const campoPassword = document.getElementById("password");
const mensaje = document.getElementById("mensaje");
const botonVerPassword = document.getElementById("verPassword");
const logoImagen = document.getElementById("logoImagen");
const logoAlternativo = document.getElementById("logoAlternativo");

// Permitir cualquier usuario y contraseña, siempre que no estén vacíos.
formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const usuario = campoUsuario.value.trim();
    const contrasena = campoPassword.value;

    if (usuario !== "" && contrasena !== "") {
        mensaje.style.color = "#286b32";
        mensaje.textContent = "¡Inicio de sesión exitoso!";
        window.location.href = "index.html";
    } else {
        mensaje.style.color = "#a12626";
        mensaje.textContent = "Ingresá un usuario y una contraseña.";
    }
});

// Mostrar u ocultar la contraseña.
botonVerPassword.addEventListener("click", function() {
    const oculta = campoPassword.type === "password";

    campoPassword.type = oculta ? "text" : "password";
    this.textContent = oculta ? "⊗" : "◉";
    this.setAttribute(
        "aria-label",
        oculta ? "Ocultar contraseña" : "Mostrar contraseña"
    );
});

// Mostrar el logo alternativo si no se encuentra img/logo.png.
logoImagen.addEventListener("error", function() {
    logoImagen.classList.add("oculto");
    logoAlternativo.classList.remove("oculto");
});

// Enlaces de ayuda de demostración.
document.getElementById("olvido").addEventListener("click", function(evento) {
    evento.preventDefault();
    alert("Para recuperar tu contraseña, contactá con soporte.");
});

document.getElementById("ayuda").addEventListener("click", function(evento) {
    evento.preventDefault();
    alert("Ingresá tu username y contraseña para entrar.");
});
