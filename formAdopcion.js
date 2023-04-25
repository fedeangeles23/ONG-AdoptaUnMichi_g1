/*Validacion form proceso*/

const formAdopcion = document.getElementById('formAdopcion');

function enviarFormularioAdop(event) {
    event.preventDefault();

    const validacion = validate(formAdopcion, {
      nombre: {
        presence: { message: ' es obligatorio.' },
        length: { minimum: 3, message: ' debe tener al menos 3 caracteres.' }
      },
      apellido: {
        presence: { message: ' es obligatorio.' },
        length: { minimum: 3, message: ' debe tener al menos 3 caracteres.' }
      },
      telefono:{
        presence: {message: ' es obligatorio'},
        length: {minimum: 6, message: ' debe tener al menos 6 digitos.'},
        format: {pattern: /^\d+$/,message: ' debe contener solo caracteres numéricos'}
      },
      email:{
        presence: {message: ' es obligatorio'},
        email: {message: 'no es un mail valido'}
      },
      direccion: {
        presence: {message: ' es obligatorio'},
        length: {minimum: 5, message: ' debe tener al menos 5 caracteres'}
      },
      numero: {
        presence: {message: ' es obligatorio'},
        format: {pattern: /^\d+$/,message: ' debe contener solo caracteres numéricos'}
      },
      localidad: {
        presence: {message: ' es obligatorio'},
        length: {minimum: 5, message: ' debe tener al menos 5 caracteres'}
      },
      cp:{
        presence: {message: ' es obligatorio'},
        format: {pattern: /^\d+$/,message: ' debe contener solo caracteres numéricos'} 
      }
    });
  
    if (validacion === undefined) {
      // formulario valido
      $(document).ready(function() {
        $('#formAdopcion').submit(function(event) {
          event.preventDefault();
          var nombre = $('#nombre').val();
          var apellido = $('#apellido').val();
          var mayor_edad = $('input[name=mayor_edad]:checked').val();
          var vivienda = $('input[name=vivienda]:checked').val();
          var patio = $('input[name=patio]:checked').val();
          var rejas = $('input[name=rejas]:checked').val();
          var telefono = $('#telefono').val();
          var email = $('#email').val();
          var direccion = $('#direccion').val();
          var numero = $('#numero').val();
          var localidad = $('#localidad').val();
          var cp = $('#cp').val();
          $('#formAdopcion').remove();
          var resumen = 
            'Nombre: ' + nombre + '<br>' +
            'Apellido: ' + apellido + '<br>' +
            '¿Tenés más de 18 años?: ' + mayor_edad + '<br>' +
            '¿Vivís en una casa o departamento?: ' + vivienda + '<br>' +
            '¿Tenés patio al aire libre?: ' + patio + '<br>' +
            '¿Las ventanas cuentan con rejas de protección?: ' + rejas + '<br>' +
            'Teléfono: ' + telefono + '<br>' +
            'Email: ' + email + '<br>' +
            'Dirección: ' + direccion + '<br>' +
            'Número: ' + numero + '<br>' +
            'Localidad: ' + localidad + '<br>' +
            'Código Postal: ' + cp+ '<br><br>' +
            'MUCHAS GRACIAS! NOS COMUNICAREMOS A LA BREVEDAD'
            ;
          var contenedorResumen = $('<div>').addClass('resumen');
          var tituloResumen = $('<h2>').text('Los datos ingresados son:');
          var parrafoResumen = $('<p>').html(resumen);
          contenedorResumen.append(tituloResumen).append(parrafoResumen);
          $('#adopta').append(contenedorResumen);
        });
      }); 
    } else {
      // formulario invalido 
      for (const campo in validacion) {
        const errores = validacion[campo];
        const input = formAdopcion.querySelector(`#${campo}`);
        const mensajeError = formAdopcion.querySelector(`#${campo}Help`);
        input.classList.add('is-invalid');
        mensajeError.innerHTML = errores.join('<br>');
        mensajeError.classList.remove('d-none');
      }
    }
  }

formAdopcion.addEventListener('submit', enviarFormularioAdop);

// Remover mensaje de error al cambiar el contenido del campo
formAdopcion.querySelectorAll('input').forEach(input => {
  input.addEventListener('input', () => {
    input.classList.remove('is-invalid');
    const mensajeError = formAdopcion.querySelector(`#${input.id}Help`);
    mensajeError.innerHTML = '';
    mensajeError.classList.add('d-none');
  });
});