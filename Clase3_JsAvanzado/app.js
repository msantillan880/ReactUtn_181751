// =========================
// 1 Clase Tarea
// =========================

class Tarea {

    constructor(id, titulo, completada = false) {
        this.id = id;
        this.titulo = titulo;
        this.completada = completada;
    }

    toggleEstado() {
        this.completada = !this.completada;
    }
}

// =========================
// 1 Clase GestorTareas
// =========================

class GestorTareas {

    constructor() {
        this.tareas = [];
    }

    agregarTarea(titulo) {

        const nuevaTarea = new Tarea(
            this.tareas.length + 1, // agrego un nuevo identificador a la tarea
            titulo,
            false
        );

        this.tareas.push(nuevaTarea);

        return nuevaTarea;
    }

    listarTareas() {

        this.tareas.forEach(tarea => {

            console.log(
                `${tarea.id} - ${tarea.titulo} - ${tarea.completada}`
            );

        });

    }

    buscarPorTitulo(titulo) {

        return this.tareas.find(
            tarea => tarea.titulo === titulo
        );

    }

    listarCompletadas() {

        return this.tareas.filter(
            tarea => tarea.completada
        );

    }

    obtenerTitulos() {

        return this.tareas.map(
            tarea => tarea.titulo
        );

    }
}

// =========================
// 2 Simulación asíncrona
// =========================

function cargarTareas() {

    return new Promise((resolve) => {

        setTimeout(() => {

            resolve([
                new Tarea(1, "Estudiar JavaScript", true),
                new Tarea(2, "Practicar Promesas", false),
                new Tarea(3, "Subir repositorio", true)
            ]);

        }, 2000);

    });

}

// Extra opcional

function cargarUsuarios() {

    return new Promise((resolve) => {

        setTimeout(() => {

            resolve([
                "Marcelo",
                "Juan",
                "Ana"
            ]);

        }, 1500);

    });

}

// =========================
// Aplicación
// =========================

const gestor = new GestorTareas();

const lista = document.getElementById("listaTareas");
const resultado = document.getElementById("resultado");

// para mostrar los cambios dinamicos de estados e items.
function mostrarEstadoActualEnConsola() {

    console.log("Estado actual de tareas:");

    gestor.listarTareas();

}

// Renderizar tareas

function renderizarTareas() {

    lista.innerHTML = "";

    gestor.tareas.forEach(tarea => {

        const li = document.createElement("li");

        li.innerHTML = `
            <strong>${tarea.titulo}</strong>
            - ${tarea.completada ? "✔ Completada" : "Pendiente"}
            <button onclick="cambiarEstado(${tarea.id})">
                Cambiar estado
            </button>
        `;

        lista.appendChild(li);

    });

}

window.cambiarEstado = function (id) {

    const tarea = gestor.tareas.find(
        tarea => tarea.id === id
    );

    if (tarea) {
        tarea.toggleEstado();
        renderizarTareas();
        mostrarEstadoActualEnConsola();
    }

};

// Agregar tarea

document
    .getElementById("btnAgregar")
    .addEventListener("click", () => {

        const input =
            document.getElementById("tituloTarea");

        const titulo = input.value.trim();

        if (!titulo) return;

        gestor.agregarTarea(titulo);

        renderizarTareas();

        mostrarEstadoActualEnConsola();

        input.value = "";

    });

// Mostrar completadas

document
    .getElementById("btnCompletadas")
    .addEventListener("click", () => {

        const completadas =
            gestor.listarCompletadas();

        resultado.innerHTML =
            `<pre>${JSON.stringify(
                completadas,
                null,
                2
            )}</pre>`;

    });

// Mostrar map

document
    .getElementById("btnTitulos")
    .addEventListener("click", () => {

        resultado.innerHTML =
            `<pre>${JSON.stringify(
                gestor.obtenerTitulos(),
                null,
                2
            )}</pre>`;

    });

// Inicio

async function iniciar() {

    console.log("Cargando tareas...");

    gestor.tareas = await cargarTareas();

    console.log(
        "Tareas cargadas correctamente"
    );

    mostrarEstadoActualEnConsola();

    renderizarTareas();

    const [tareas, usuarios] =
        await Promise.all([
            cargarTareas(),
            cargarUsuarios()
        ]);

    console.log("Promise.all");

    console.log(tareas);

    console.log(usuarios);

}

iniciar();