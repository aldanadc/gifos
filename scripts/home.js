const topInput = document.querySelector(".top-search-input");
const input = document.querySelector(".search-input");
const verMas = document.getElementById("ver-mas-search");
const magGlass = document.querySelector(".search-icon:nth-of-type(2)");
const navBar = document.querySelector("#nav");
const grayGlass = document.getElementById("search-icon-gray");
const pTrending = document.getElementById("trending-topics");
const suggField = document.getElementById("suggestions-wrapper");
let searchOffset = 0;


//OBTENER INFO TTs
let getTTs = async () => {
  const trendingTopicsUrl = `https://api.giphy.com/v1/trending/searches?api_key=${APIkey}`;
  const response = await fetch(trendingTopicsUrl);
  const data = response.json();
  return data;
}

getTTs().then(data => {
  displayTTs(data);

}).catch(() => {
  pTrending.innerText = "Reactions, Entertainment, Sports, Stickers, Artists";
});

//OBTENER INFO BÚSQUEDA
function searchGifs(inputValue) {

  cleanFields(); //LIMPAR CAMPOS CON CONTENIDO DE BÚSQUEDA ANTERIOR

  changeIconsOnSearch();

  async function newSearch(searchTerm) {
    const searchUrl = `https://api.giphy.com/v1/gifs/search?api_key=${APIkey}&q=${searchTerm}&limit=12&offset=${searchOffset}`;
    const response = await fetch(searchUrl);
    const data = await response.json();
    return data
  };

  newSearch(inputValue) //INICIAR NUEVA BÚSQUEDA CON INPUT
    .then(results => {
      displaySearchTitle(inputValue); //MUESTRA TÍTULO E INPUT DE LO QUE SE BUSCÓ

      //SI NO ENCUENTRA NADA DISPARA NO RESULTS
      if (results.data.length === 0) {
        noResults();
      } else {
        //PINTAR GIFS SI SÍ ENCUENTRA ALGO
        displayGifs(results);
      }

      const resultsSection = document.querySelector("#search-results #before-title");
      const resultsSectionOffset = resultsSection.offsetTop;
      const scrollToPoint = resultsSectionOffset - (resultsSectionOffset*0.12);

      window.scroll({
        top: scrollToPoint,
        behavior: 'smooth'
      });
    }).catch(e => {
      console.log(e)
      noResults();
    }); 
}


//TRAER MÁS GIFS CON BOTÓN VER MÁS
const loadMoreGifs = (input) => {
  async function getMoreGifs(searchTerm) {
    searchOffset = searchOffset + 12;
    const searchUrl = `https://api.giphy.com/v1/gifs/search?api_key=${APIkey}&q=${searchTerm}&limit=12&offset=${searchOffset}`;
    const response = await fetch(searchUrl);
    const data = await response.json();
    return data;
  }

  getMoreGifs(input.value)
    .then(results => {
      if (results.data.length === 12) {
        displayGifs(results);
      } else { //SI EL NUEVO ARRAY TRAE MENOS DE 12
        displayGifs(results);
        verMas.style.display = "none";
      }
    }).catch(e => console.log(e));
}

//MOSTRAR SUGERENCIAS AL ESCRIBIR EN INPUT
let showSuggestions = () => {
  async function getSuggestions(searchTerm) {
    const suggestUrl = `https://api.giphy.com/v1/tags/related/${searchTerm}?api_key=${APIkey}`;
    const response = await fetch(suggestUrl);
    const data = await response.json();
    return data;
  }

  getSuggestions(input.value)
    .then(suggestions => {

      suggField.innerHTML = ""; //BORRA SUGERENCIAS ANTERIORES CUANDO ACTUALIZA
      const suggestionsLine = document.createElement("div");
      suggestionsLine.setAttribute("id", "sugg-division-line");
      suggField.appendChild(suggestionsLine);
      grayGlass.style.visibility = "visible";
      magGlass.style.width = "14px";
      magGlass.style.height = "14px";

      if (body[0].classList.contains("dark-mode") !== true) {
        magGlass.src = "images/close.svg";
      } else {
        magGlass.src = "images/close-modo-noct.svg";
      }

      createSuggestions(suggestions);

    }).catch(e => console.log(e));
}



//DISPARAR FUNCIONES

input.addEventListener("keyup", (event) => {

  if (event.key === "Enter") {
    searchGifs(input.value);
    topInput.value = "";
  }
});

topInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    searchGifs(topInput.value);
  }

  topMagGlass.style.marginTop = 0;
  magGlass.style.width = "20px"; // BÚSQUEDA DE ARRIBA NO MODIFIQUE ÍCONO DE BARRA DE BÚSQUEDA PRINCIPAL
  magGlass.style.height = "20px";

  const darkMode = localStorage.getItem("dark-mode-active");

    if (darkMode === "false") {
      magGlass.src = "images/icon-search.svg";
    }else {
      magGlass.src = "images/icon-search-modo-noct.svg";
    }

  input.value = "";
});

const topMagGlass = document.querySelector(".top-search-icon");

topMagGlass.addEventListener("click", () => {
  searchGifs(topInput.value);
  topMagGlass.style.marginTop = 0;
  input.value = "";
  cancelSearch();

})


verMas.addEventListener("click", () => {
  loadMoreGifs(topInput);
})

verMas.addEventListener("click", () => {
  loadMoreGifs(input);
})

input.addEventListener("input", () => {
  if (input.value.length >= 3) { //SUGIERE A PARTIR DE TRES LETRAS
    showSuggestions(input);
    cancelSearch();
  } else {
    cleanSuggBox();
  }
})


const mainSearchWrapper = document.getElementById("main-search-wrapper");
const topSearchWrapper = document.querySelector(".top-search-wrapper");
const stickyPoint = mainSearchWrapper.offsetTop;

window.addEventListener("scroll", function() {
  if (window.pageYOffset > stickyPoint) {
    topSearchWrapper.style.visibility = "visible";
  } else {
    topSearchWrapper.style.visibility = "hidden";
  }
});

