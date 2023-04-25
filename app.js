const endpoint = "https://api.thecatapi.com/v1/images/search";

const imageContainer = document.getElementById("image-container");
const newImageButton = document.getElementById("new-image-button");

function getNewImages() {
  Promise.all([fetch(endpoint), fetch(endpoint), fetch(endpoint)])
    .then((responses) =>
      Promise.all(responses.map((response) => response.json()))
    )
    .then((data) => {
      imageContainer.innerHTML = "";
      data.forEach((imageData) => {
        const imageUrl = imageData[0].url;
        const imageElement = document.createElement("img");
        imageElement.src = imageUrl;
        imageContainer.appendChild(imageElement);
      });
    });
}

getNewImages();

newImageButton.addEventListener("click", getNewImages);


/* VALIDATE JS FUNCIONES FORM CONTACTO */

const form = document.getElementById("form-contacto");

function enviarFormulario(event) {
  event.preventDefault();

  const validacion = validate(form, {
    nombre: {
      presence: { message: "El campo nombre es obligatorio." },
      length: {
        minimum: 3,
        message: "El campo nombre debe tener al menos 3 caracteres.",
      },
    },
    email: {
      presence: { message: "El campo email es obligatorio." },
      email: {
        message:
          "El campo email debe ser una dirección de correo electrónico válida.",
      },
    },
    mensaje: {
      presence: { message: "El campo mensaje es obligatorio." },
      length: {
        minimum: 10,
        message: "El campo mensaje debe tener al menos 10 caracteres.",
      },
    },
  });

  if (validacion === undefined) {
    // formulario validado
    $("#contacto").submit(function (event) {
      event.preventDefault();
      $("body").children().not("header, footer").remove(); // Eliminar todos los elementos del body excepto header y footer
      var respuesta = "El formulario fue enviado correctamente." + "<br>";
      var contenedorRespuesta = $("<div>").addClass("respuesta");
      var parrafoRespuesta = $("<p>").html(respuesta);
      contenedorRespuesta.append(parrafoRespuesta);
      var botonInicio = $('<a>').attr('href', 'index.html').text('Volver al Inicio');
      botonInicio.on("click", function () {
        location.href = "index.html"; 
      });
      contenedorRespuesta.append(botonInicio); 
      $("header").after(contenedorRespuesta); 
      
      // Agregar estilo fixed al footer
      $("footer").css("position", "fixed").css("bottom", "0").css('width',"100vw");
    });
    
  } else {
    // formulario invalido
    for (const campo in validacion) {
      const errores = validacion[campo];
      const input = form.querySelector(`#${campo}`);
      const mensajeError = form.querySelector(`#${campo}Help`);
      input.classList.add("is-invalid");
      mensajeError.innerHTML = errores.join("<br>");
      mensajeError.classList.remove("d-none");
    }
  }
}

form.addEventListener("submit", enviarFormulario);

// Remover mensaje de error al cambiar el contenido del campo
form.querySelectorAll(".form-control").forEach((input) => {
  input.addEventListener("input", () => {
    input.classList.remove("is-invalid");
    const mensajeError = form.querySelector(`#${input.id}Help`);
    mensajeError.innerHTML = "";
    mensajeError.classList.add("d-none");
  });
});
