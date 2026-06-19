const mayorDeEdad = 18; // mayoría de edad en argentina

function procesarEnvio() {
    const nombre = document.getElementById("nombre").value;
    const edad = document.getElementById("edad").value;

    if (Number(edad) >= mayorDeEdad) {

        mensaje.textContent = `✅ Bienvenido ${nombre}, tenes acceso al evento.`;
        mensaje.classList.remove("negativo");
        mensaje.classList.add("positivo");
    } else {

        mensaje.textContent = `❌ Lo sentimos ${nombre}, debes ser mayor de edad.`;
        mensaje.classList.remove("positivo");
        mensaje.classList.add("negativo");
    }


    // Limpiar campos después del envío exitoso

    setTimeout(() => {
        mensaje.textContent = "";
    }, 2000);
    document.getElementById("nombre").value = "";
    document.getElementById("edad").value = "";

}

// 2. Referencia al formulario y manejo del envío
const form = document.querySelector(".form-contact");
form.addEventListener("submit", function (event) {
    event.preventDefault();
    procesarEnvio();
});
