const favNoContent = document.getElementById("fav-no-content");
const favContent = document.getElementById("fav-with-content");
const favsAnchor = document.querySelector("#menu li:nth-of-type(2) a");
const verMasBtn = document.querySelector("#ver-mas-favs");
let favedGifId;

favsAnchor.style.color = "#9CAFC3";

if (window.matchMedia("(min-width: 1024px)").matches) {
  menu.style.marginLeft = "35%";
  //menu.style.backgroundColor = "#37383C";
  function showFavourites() {
    const hasFavourites = localStorage.getItem("has-favourites");
    const storedGifs = localStorage.getItem("faved-gifs");
    const storedGifsArray = JSON.parse(storedGifs);
  
    if (hasFavourites === "true") {
      favNoContent.classList.add("hidden");
  
      for (let gifId of storedGifsArray) { 
        const gifContainer = document.createElement("section");
        const img = document.createElement("img");
        const gifOverlay = document.createElement("div");
        img.setAttribute("class", "faved-gifs");
        img.classList.add("faved-gif");
        gifContainer.setAttribute("class", "gif-container");
        gifOverlay.setAttribute("class", "gif-overlay");
        favedGifId = gifId;
  
        fetchGif(favedGifId, APIkey).then(data => {
          img.src = data.data.images.fixed_height.url;
          img.id = data.data.id;
          createGifInfo(gifOverlay, data.data);
        })
  
        gifContainer.appendChild(img);
        gifContainer.appendChild(gifOverlay);
        favContent.appendChild(gifContainer);
  
        createGifIcons(gifOverlay);
  
        displayIconsOnHover(gifOverlay);
      }
  
      if (storedGifsArray.length > 12) {
        verMasBtn.style.display = "block";
      }
  
    } else if (hasFavourites === false) {
      favNoContent.style.display = "block";
    }
  }
  
}else {
  function showFavourites() {
    const hasFavourites = localStorage.getItem("has-favourites");
    const storedGifs = localStorage.getItem("faved-gifs");
    const storedGifsArray = JSON.parse(storedGifs);
  
    if (hasFavourites === "true") {
      favNoContent.classList.add("hidden");
  
      for (let gifId of storedGifsArray) { 
        const gifContainer = document.createElement("section");
        const img = document.createElement("img");
        const gifOverlay = document.createElement("div");
        img.setAttribute("class", "faved-gifs");
        img.classList.add("gif");
        img.classList.add("faved-gif");
        gifContainer.setAttribute("class", "gif-container");
        gifOverlay.setAttribute("class", "gif-overlay");
        favedGifId = gifId;
  
        fetchGif(favedGifId, APIkey).then(data => {
          img.src = data.data.images.fixed_height.url;
          img.id = data.data.id;
          createGifInfo(gifOverlay, data.data);
        })
  
        gifContainer.appendChild(img);
        gifContainer.appendChild(gifOverlay);
        favContent.appendChild(gifContainer);
  
      }
  
      addAndRemoveFavsMobile();
  
      //maxGif();
  
    } else if (hasFavourites === false) {
      favNoContent.style.display = "block";
    }
  }
}

showFavourites();



