const favNoContent = document.getElementById("fav-no-content");
const favContent = document.getElementById("fav-with-content");
const sectionLink = document.querySelector("#menu li:nth-of-type(2) a");
const verMasBtn = document.querySelector("#ver-mas-favs");
let favedGifId;

sectionLink.style.color = "#9CAFC3";

if (window.matchMedia("(min-width: 1024px)").matches) {
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
        img.classList.add("faved-gif"); //** agregué
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
        //img.classList.add("faved-gif"); //** agregué
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
  
      addAndRemoveFavMobile();
  
      //maxGif();
  
    } else if (hasFavourites === false) {
      favNoContent.style.display = "block";
    }
  }
}

showFavourites();


// function showFavouritesMobile() {
//   const hasFavourites = localStorage.getItem("has-favourites");
//   const storedGifs = localStorage.getItem("faved-gifs");
//   const storedGifsArray = JSON.parse(storedGifs);

//   if (hasFavourites === "true") {
//     favNoContent.classList.add("hidden");

//     for (let gifId of storedGifsArray) { 
//       const gifContainer = document.createElement("section");
//       const img = document.createElement("img");
//       const gifOverlay = document.createElement("div");
//       img.setAttribute("class", "faved-gif");
//       img.classList.add("gif");
//       gifContainer.setAttribute("class", "gif-container");
//       gifOverlay.setAttribute("class", "gif-overlay");
//       favedGifId = gifId;

//       fetchGif(favedGifId, APIkey).then(data => {
//         img.src = data.data.images.fixed_height.url;
//         img.id = data.data.id;
//         createGifInfo(gifOverlay, data.data);
//       })

//       gifContainer.appendChild(img);
//       gifContainer.appendChild(gifOverlay);
//       favContent.appendChild(gifContainer);

//     }

//     addAndRemoveFavMobile();

//     maxGif();

//   } else if (hasFavourites === false) {
//     favNoContent.style.display = "block";
//   }
// }

// function showFavourites() {
//   const hasFavourites = localStorage.getItem("has-favourites");
//   const storedGifs = localStorage.getItem("faved-gifs");
//   const storedGifsArray = JSON.parse(storedGifs);

//   if (hasFavourites === "true") {
//     favNoContent.classList.add("hidden");

//     for (let gifId of storedGifsArray) { 
//       const gifContainer = document.createElement("section");
//       const img = document.createElement("img");
//       const gifOverlay = document.createElement("div");
//       img.setAttribute("class", "faved-gif");
//       gifContainer.setAttribute("class", "gif-container");
//       gifOverlay.setAttribute("class", "gif-overlay");
//       favedGifId = gifId;

//       fetchGif(favedGifId, APIkey).then(data => {
//         img.src = data.data.images.fixed_height.url;
//         img.id = data.data.id;
//         createGifInfo(gifOverlay, data.data);
//       })

//       gifContainer.appendChild(img);
//       gifContainer.appendChild(gifOverlay);
//       favContent.appendChild(gifContainer);

//       createGifIcons(gifOverlay);

//       displayIconsOnHover(gifOverlay);
//     }

//     if (storedGifsArray.length > 12) {
//       verMasBtn.style.display = "block";
//     }

//   } else if (hasFavourites === false) {
//     favNoContent.style.display = "block";
//   }
// }










//ASÍ ESTABA ANTES DE HACER VERSION MOBILE:
// function showFavourites() {
//   const hasFavourites = localStorage.getItem("has-favourites");
//   const storedGifs = localStorage.getItem("faved-gifs");
//   const storedGifsArray = JSON.parse(storedGifs);

//   if (hasFavourites === "true") {
//     favNoContent.classList.add("hidden");

//     for (let gifId of storedGifsArray) { 
//       const gifContainer = document.createElement("section");
//       const img = document.createElement("img");
//       const gifOverlay = document.createElement("div");
//       img.setAttribute("class", "faved-gifs");
//       gifContainer.setAttribute("class", "gif-container");
//       gifOverlay.setAttribute("class", "gif-overlay");
//       favedGifId = gifId;

//       fetchGif(favedGifId, APIkey).then(data => {
//         img.src = data.data.images.fixed_height.url;
//         img.id = data.data.id;
//         createGifInfo(gifOverlay, data.data);
//       })

//       gifContainer.appendChild(img);
//       gifContainer.appendChild(gifOverlay);
//       favContent.appendChild(gifContainer);

//       createGifIcons(gifOverlay);

//       displayIconsOnHover(gifOverlay);
//     }


//   } else if (hasFavourites === false) {
//     favNoContent.style.display = "block";
//   }
// }

// showFavourites();



