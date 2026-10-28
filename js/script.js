const formulario = document.getElementById("formcontacto");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nombre = document.getElementById("Nombre").value;
    const correo = document.getElementById("correo").value;

    if (nombre === "" || correo === "") {
        alert("Debe completar los campos obligatorios.");
    } else {
        alert("Formulario enviado correctamente.");
    }
    
});


