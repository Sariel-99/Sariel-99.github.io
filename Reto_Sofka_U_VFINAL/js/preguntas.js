
const examen = new Examen();
const btnAvanzar = document.getElementById('btnAvanzar');

cargarEventos();

function cargarEventos() {
    document.addEventListener('DOMContentLoaded', mostrar);
    btnAvanzar.addEventListener('click', verificar);
}

let i = 0;
let respuesta;

function mostrar() {

    if (i >= baseDePreguntas.length ) {
        Swal.fire({
            type: 'success',
            title: '¡¡Haz Ganado!!',
            text : 'Felicidades Haz contestado todas las preguntas correctamente',
            html:'<a href="index.html" class="btn btn-primary mt-4">SALIR</a>',
            footer:'Gracias por Jugar',
            backdrop: true,
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false
        })
    }
    else {
        document.getElementById('tituloPregunta').innerHTML = `${i+1}. ${baseDePreguntas[i].tituloPregunta}`
        document.getElementById('opcion1').innerHTML = baseDePreguntas[i].opciones[0].alternativa1;
        document.getElementById('opcion2').innerHTML = baseDePreguntas[i].opciones[0].alternativa2;
        document.getElementById('opcion3').innerHTML = baseDePreguntas[i].opciones[0].alternativa3;
        document.getElementById('opcion4').innerHTML = baseDePreguntas[i].opciones[0].alternativa4;
        respuesta = baseDePreguntas[i].respuesta;
        i = i + 1;
        
    }
}

fetch('json/preguntas.json')
        .then(response => {
            return response.json();
        })
        .then(response => {
            baseDePreguntas = response;
            for (let i = 0; i < 4; i++) {
                baseDePreguntas.sort(()=>Math.random()-0.5);
            }
            baseDePreguntas = baseDePreguntas.slice(0,5);
            mostrar( );
        })
        .catch(error => {
            console.log(error);
        })

function verificar() {

    const tipo = document.querySelector('input[name="alternativas"]:checked').value;
    let respuestaLS;
    respuestaLS = examen.obtenerExamenLocalStorage();
    let tamaño = respuestaLS.length;

    if(respuesta == tipo){
        respuestaLS[tamaño - 1].puntaje = respuestaLS[tamaño -1].puntaje + 100;
        localStorage.setItem('examen', JSON.stringify(respuestaLS));

        Swal.fire({
            title: 'Respuesta Correcta',
            width: 600,
            padding: '3em',
            color: '#716add',
            showConfirmButton: false,
            timer: 1500,
            backdrop: `
              rgba(0,0,123,0.4)
              url("/img/R.gif")
              left top
              no-repeat
            `
          })
          mostrar();
    }
    else {

        Swal.fire({
            type: 'error',
            title: '¡¡Haz Perdido!!',
            text : 'Respuesta Incorrecta',
            html:'<a href="index.html" class="btn btn-primary mt-4">SALIR</a>',
            footer:'Gracias por Jugar',
            backdrop: true,
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false
        })
       
    }


}




