const examen = new Examen();
const btnEmpezar = document.getElementById('btnEmpezar');
const listaResultados = document.getElementById('listaResultados');
const btnResultado = document.getElementById('btnResultado');

Swal.fire({
    type: 'info',
    title: '¡¡Bienvenido!!',
    text : 'Felicidades Haz contestado todas las preguntas correctamente',
    html:
    '<li>Constesta 5 preguntas de manera correcta para ganar.</li>'+
    '<li>Cada pregunta tiene cuatro respuestas, una es la correcta.</li>'+
    '<li>Al contestar correctamente incrementara la dificultad.</li>'+
    '<li>Cada pregunta tiene un puntaje de 100.</li>'+
    '<li>Contestar erroneamente dará por terminaro el juego.</li>',
    footer:'Buena suerte',
    backdrop: true,
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false
})


cargarEventos();

function cargarEventos() {
    btnEmpezar.addEventListener('click', verificar);
    btnResultado.addEventListener('click', (e) => {examen.leerLocalStorage(e)});
}

function verificar(e) {
    e.preventDefault();

    let nombre = document.getElementById('nombre').value;

    if(nombre===''){
        Swal.fire({
            type: 'error',
            title: 'Oops',
            text : 'Ingrese todos los campos requeridos',
            showConfirmButton: false,
            timer: 2000
        })
    }
    else {
        examen.empezarExamen(nombre);
    }
}