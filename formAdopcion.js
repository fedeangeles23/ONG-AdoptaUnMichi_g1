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
      dni: {
        presence: { message: ' es obligatorio.' },
        length: { is: 8, message: ' debe tener 8 digitos.' }
      }
    });
  
    if (validacion === undefined) {
      // formulario valido aca hay que hacer la accion con esos datos
      console.log('Formulario válido, enviando...');
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
formAdopcion.querySelectorAll('.form-control').forEach(input => {
  input.addEventListener('input', () => {
    input.classList.remove('is-invalid');
    const mensajeError = formAdopcion.querySelector(`#${input.id}Help`);
    mensajeError.innerHTML = '';
    mensajeError.classList.add('d-none');
  });
});