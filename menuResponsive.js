/*Menu desplegable */

const menuResponsive = document.querySelector(".menuResponsive");
const links = document.querySelector(".navbar-collapse");
const overlay = document.querySelector(".menu-overlay");

menuResponsive.addEventListener("click", () => {
  links.classList.toggle("active");
  overlay.classList.toggle("active");

  if (overlay.classList.contains("active")) {
    overlay.addEventListener("click", hideOverlay);
  } else {
    overlay.removeEventListener("click", hideOverlay);
  }
});

function hideOverlay(event) {
  if (!event.target.closest(".navbar")) {
    links.classList.remove("active");
    overlay.classList.remove("active");
    overlay.removeEventListener("click", hideOverlay);
  }
}
