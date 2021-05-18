const input = document.querySelector(".search-input");
const verMas = document.getElementById("ver-mas-search");
const magGlass = document.querySelector(".search-icon");
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
function searchGifs() {

  cleanFields(); //LIMPAR CAMPOS CON CONTENIDO DE BÚSQUEDA ANTERIOR

  changeIconsOnSearch();

  async function newSearch(searchTerm) { //LLAMADO A API PARA BUSCAR
    const searchUrl = `https://api.giphy.com/v1/gifs/search?api_key=${APIkey}&q=${searchTerm}&limit=12&offset=${searchOffset}`;
    const response = await fetch(searchUrl);
    const data = await response.json();
    return data
  };

  newSearch(input.value) //INICIAR NUEVA BÚSQUEDA CON INPUT
    .then(results => {

      displaySearchTitle(); //MUESTRA TÍTULO E INPUT DE LO QUE SE BUSCÓ

      //SI NO ENCUENTRA NADA DISPARA NO RESULTS
      if (results.data.length === 0) {
        noResults();
      } else {
        //FUNCION PARA PINTAR GIFS SI SÍ ENCUENTRA ALGO
        displayGifs(results);
      }
    })
}


//TRAER MÁS GIFS CON BOTÓN VER MÁS
const loadMoreGifs = () => {
  async function getMoreGifs(searchTerm) {
    searchOffset = searchOffset + 12;
    const searchUrl = `https://api.giphy.com/v1/gifs/search?api_key=${APIkey}&q=${searchTerm}&limit=12&offset=${searchOffset}`;
    const response = await fetch(searchUrl);
    const data = await response.json();
    return data;
  }

  // getMoreGifs(input.value)
  //   .then(results => {
  //     if (results.data.length === 12) {
  //       createGifs(results, 12);
  //     } else { //SI EL NUEVO ARRAY TRAE MENOS DE 12
  //       createGifs(results, results.data.length)
  //       verMas.style.display = "none";
  //     }
  //   });

  getMoreGifs(input.value)
    .then(results => {
      if (results.data.length === 12) {
        displayGifs(results);
      } else { //SI EL NUEVO ARRAY TRAE MENOS DE 12
        displayGifs(results);
        verMas.style.display = "none";
      }
    });
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

    });
}


//DISPARAR FUNCIONES

input.addEventListener("keyup", (event) => {

  if (event.key === "Enter") {
    searchGifs();
  }
});


verMas.addEventListener("click", loadMoreGifs);


input.addEventListener("input", () => {

  if (input.value.length >= 3) { //SUGIERE A PARTIR DE TRES LETRAS
    showSuggestions();
    cancelSearch();
  } else {
    cleanSuggBox();
  }
})