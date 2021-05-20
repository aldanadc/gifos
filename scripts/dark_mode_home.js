function setDarkModeHome() {
  const darkMode = localStorage.getItem("dark-mode-active");

  if (darkMode === "true") {
    input.style.color = "#FFF";
    magGlass.src = "images/icon-search-modo-noct.svg";
    topMagGlass.src = "images/icon-search-modo-noct.svg";

  } else {
    input.style.color = "#000";
    magGlass.src = "images/icon-search.svg";
  }
}

darkModeButton.addEventListener("click", () => {
  setDarkModeHome();
})

setDarkModeHome();

