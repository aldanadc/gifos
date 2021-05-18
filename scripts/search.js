const searchWrapper = document.getElementById("main-search-wrapper");
// const topSearchWrapper = document.querySelector(".search-wrapper:first-of-type");
// const mainSearchWrapper = document.querySelector("#main-search-wrapper");
const resultsContainer = document.getElementById("results-wrapper");
const noResultsDiv = document.getElementById("no-results");
const searchTitle = document.getElementById("search-title");
const beforeTitle = document.getElementById("before-title");


//DEFINIR FUNCIÓN TRAER 0 RESULTADOS
let noResults = () => {
  noResultsDiv.style.display = "block";
}

//DEFINIR FUNCIÓN PARA LIMPIAR CAMPOS
const cleanFields = () => {
  resultsContainer.innerHTML = "";  //VACIAR GIFS ANTERIORES ANTES DE HACER NUEVA BÚSQUEDA
  if (noResultsDiv.style.display = "block") { //VACIAR NO RESULTS SI ESTABA
    noResultsDiv.style.display = "none";
  }
  if (verMas.style.display = "block") { //BORRAR BOTÓN DE VER MÁS SI ESTABA DE ANTES POR SI LA NUEVA BÚSQUEDA NO TRAE NADA
    verMas.style.display = "none";
  }
  searchTitle.innerHTML = ""; //PARA QUE NO QUEDE EL TÍTULO DE LA BÚSQUEDA ANTERIOR MIENTRAS TRAE LOS NUEVOS GIFS

  suggField.innerHTML = ""; //LIMPIA SUGERENCIAS ANTES DE MOSTRAR RESULTADOS
  searchWrapper.style.height = "50px"; //VUELVE SEARCH FIELD PEQUEÑO
  grayGlass.style.visibility = "hidden"; //ESCONDE LUPA IZQUIERDA
}


//DEFINIR FUNCIÓN PARA MODIFICAR INPUT Y TÍTULO
function displaySearchTitle() {

  //MAYÚSCULA PRIMERA LETRA Y RESTO MINÚSCULA EN INPUT
  input.value = (input.value).charAt(0).toUpperCase() + ((input.value).slice(1)).toLowerCase();

  //COMPLETA TÍTULO DE LO BUSCADO Y MUESTRA LÍNEA GRIS
  searchTitle.innerHTML = (input.value).charAt(0).toUpperCase() + (input.value).slice(1);
  beforeTitle.style.display = "block";
}

//MOSTRAR RESULTADOS BÚSQUEDA
function displayGifs(results) {
  createGifs(results, results.data.length)

  if (results.data.length === 12) { //MUESTRA BOTÓN VER MÁS SI TRAJO 12 RESULTADOS
    verMas.style.display = "block";
  }
}

function createGifs(results, dataLength) {
  for (let i = 0; i < dataLength; i++) {
    const gifContainer = document.createElement("section");
    const searchedGif = document.createElement("img");
    const gifOverlay = document.createElement("div");
    gifContainer.setAttribute("class", "search-gif-container");
    searchedGif.setAttribute("class", "result-gif");
    searchedGif.classList.add("gif");
    searchedGif.setAttribute("src", results.data[i].images.fixed_height.url);
    searchedGif.setAttribute("id", results.data[i].id);
    gifOverlay.setAttribute("class", "gif-overlay");
    gifContainer.appendChild(searchedGif);
    gifContainer.appendChild(gifOverlay);
    resultsContainer.appendChild(gifContainer);

    createGifIcons(gifOverlay);

    displayIconsOnHover(gifOverlay);

    createGifInfo(gifOverlay, results.data[i]);
  }

  changeIconsOnHover();

  addAndRemoveFavourites();
  
  downloadGif();
  
  maxGif(results);
}


function displayTTs(data) {
  //AGREGAR PRIMEROS CUATRO TOPICS

  for (let i = 0; i < 4; i++) {
    const trendingTopic = document.createElement("span");
    let text = trendingTopic.innerText;
    trendingTopic.setAttribute("class", "TTsearch");
    text = `${data.data[i]}, `;
    const capitalized = text.charAt(0).toUpperCase() + text.slice(1);
    trendingTopic.innerText = capitalized;
    pTrending.appendChild(trendingTopic);

    trendingTopic.addEventListener("click", () => { //CONVIERTE TRENDING TOPIC EN INPUT Y BUSCA
      const ttTerm = (text.slice(0, text.length - 2));
      input.value = ttTerm;
      searchGifs(input.value);
      cancelSearch();
    })
  }

  //AGREGAR ÚLTIMO TOPIC SIN COMA AL FINAL
  for (let i = 5; i < 6; i++) {
    const trendingTopic = document.createElement("span");
    let text = trendingTopic.innerText;
    trendingTopic.setAttribute("class", "TTsearch");
    text = (`${data.data[i]}`);
    const capitalized = text.charAt(0).toUpperCase() + text.slice(1);
    trendingTopic.innerText = capitalized;
    pTrending.appendChild(trendingTopic);

    trendingTopic.addEventListener("click", () => { //CONVIERTE ÚLTIMO TT EN INPUT Y BUSCA
      const ttTerm = (text.slice(0, text.length));
      input.value = ttTerm;
      searchGifs(input.value);
      cancelSearch();
    })
  }
}

const createSuggestions = (suggestions) => {
  for (let i = 0; i < 4; i++) { //CREAR CUATRO SUGERENCIAS CADA VEZ QUE SE DISPARA LA FUNCIÓN

    const suggestion = document.createElement("p");
    suggestion.innerHTML = (suggestions.data[i].name).charAt(0).toUpperCase() + (suggestions.data[i].name).slice(1);
    suggestion.classList.add("suggestion-p");
    searchWrapper.style.height = "180px";
    suggField.appendChild(suggestion);

    suggestion.addEventListener("click", () => { //CONVIERTE SELECCIÓN DE SUGERENCIA EN INPUT Y BORRA EL RESTO
      input.value = suggestion.innerHTML;
      searchGifs(input.value);
    })
  }
}

const cleanSuggBox = () => {
  suggField.innerHTML = "";
  searchWrapper.style.height = "50px";
  grayGlass.style.visibility = "hidden";
  magGlass.src = "images/icon-search.svg";
  magGlass.style.marginTop = "15px";
  magGlass.style.width = "20px";
  magGlass.style.height = "20px";
}

const cancelSearch = () => {
  magGlass.addEventListener("click", () => { //HACER CLICK EN CRUZ BORRA INPUT, CAMBIA A LUPA OTRA VEZ, BORRA SUGERENCIAS
    input.value = "";

    if (body[0].classList.contains("dark-mode") !== true) {
      magGlass.src = "images/icon-search.svg";
    } else {
      magGlass.src = "images/icon-search-modo-noct.svg";
    }

    cleanSuggBox();

  })
}

//CAMBIAR ÍCONOS DE LUPA EN BARRA DE BÚSQUEDA:
const changeIconsOnSearch = () => {

  if (body[0].classList.contains("dark-mode") !== true) {
    magGlass.src = "images/close.svg";
  } else {
    magGlass.src = "images/close-modo-noct.svg";
  }

  magGlass.style.width = "14px";
  magGlass.style.height = "14px";
  magGlass.style.marginTop = "17px";
  grayGlass.style.visibility = "hidden";
  input.style.marginLeft = "0";
}



