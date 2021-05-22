const body = document.getElementsByTagName("body");
const topBottomLine = document.querySelectorAll(".purple-line");
const logo = document.querySelector("#logo");
const createBtn = document.getElementById("btn-create");
const cameraImg = document.querySelector("#img-camera");
const filmRoll1 = document.querySelector(".film-roll-1");
const filmRoll2= document.querySelector(".film-roll-2");
const filmRoll3 = document.querySelector(".film-roll-3");
const darkModeButton = document.querySelector("#btn-dark-mode");


function darkModeCreateGif() {

  const darkMode = localStorage.getItem("dark-mode-active");
  
  if (darkMode === "true") {
    body[0].classList.add("dark-mode");
    darkModeButton.innerHTML = "Modo Diurno";
    logo.src = "images/Logo-modo-noc.svg";
    createBtn.src = "images/CTA-crear-gifo-active.svg";
    burger.src = "images/burger-modo-noct.svg";
    cameraImg.src = "images/camara-modo-noc.svg";
    filmRoll1.src = "images/element_cinta1-modo-noc.svg";
    filmRoll2.src = "images/element_cinta2-modo-noc.svg";
    filmRoll3.src = "images/pelicula-modo-noc.svg";

  }else {
    body[0].classList.remove("dark-mode");
    darkModeButton.innerHTML = "Modo Nocturno";
    logo.src = "images/logo-mobile.svg";
    createBtn.src = "images/CTA-crear-gifo-active.svg";
    burger.src = "images/burger.svg";
    cameraImg.src = "images/element-camara.svg";
    filmRoll1.src = "images/element_cinta1.svg";
    filmRoll2.src = "images/element_cinta2.svg";
    filmRoll3.src = "images/pelicula.svg";
  }
}

darkModeCreateGif();


darkModeButton.addEventListener("click", () => {

  const darkMode = localStorage.getItem("dark-mode-active");

  if (darkMode === "false") {
    localStorage.setItem("dark-mode-active", true);

  } else {
    localStorage.setItem("dark-mode-active", false);

  }

  darkModeCreateGif();
})


darkModeButton.addEventListener("click", () => {

  const darkMode = localStorage.getItem("dark-mode-active");

  if (darkMode === "true") {
    createBtn.src = "images/CTA-crear-gifo-active.svg";
    cameraImg.src = "images/camara-modo-noc.svg";
    filmRoll1.src = "images/element_cinta1-modo-noc.svg";
    filmRoll2.src = "images/element_cinta2-modo-noc.svg";
    filmRoll3.src = "images/pelicula-modo-noc.svg";

  } else {
    createBtn.src = "images/CTA-crear-gifo-active.svg";
    cameraImg.src = "images/element-camara.svg";
    filmRoll1.src = "images/element_cinta1.svg";
    filmRoll2.src = "images/element_cinta2.svg";
    filmRoll3.src = "images/pelicula.svg";
    filmRoll3.src = "images/pelicula.svg";
  }
})
