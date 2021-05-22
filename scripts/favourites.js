const favNoContent = document.getElementById("fav-no-content");
const favContent = document.getElementById("fav-with-content");
const favsAnchor = document.querySelector("#menu li:nth-of-type(2) a");
const verMasBtn = document.querySelector("#ver-mas-favs");
const storedGifs = localStorage.getItem("faved-gifs");
const storedGifsArray = JSON.parse(storedGifs);
let favedGifId;
let offset = 0;

favsAnchor.style.color = "#9CAFC3";


if (window.matchMedia("(min-width: 1024px)").matches) {
  menu.style.marginLeft = "35%";

  function showFavourites() {
    const hasFavourites = localStorage.getItem("has-favourites");

    if (hasFavourites === "true") {
      favNoContent.classList.add("hidden");

      if (storedGifsArray.length <= 12) {
        loadFaves(offset, storedGifsArray.length, storedGifsArray);
        //offset = offset + (storedGifsArray.length);
        console.log(offset);
        //verMasBtn.style.display = "none";
      } else if (storedGifsArray.length > 12) {
        verMasBtn.style.display = "block";
        loadFaves(offset, 12, storedGifsArray);
        offset += 12;
        console.log(offset);
        verMasBtn.classList.remove("hidden");
      }
      
    } else if (hasFavourites === "false") {
      favNoContent.style.display = "block";
    }
  }

  verMasBtn.addEventListener("click", () => {
    loadMoreGifs();
  })

}else {
  function showFavourites() {
    const hasFavourites = localStorage.getItem("has-favourites");
    // const storedGifs = localStorage.getItem("faved-gifs");
    // const storedGifsArray = JSON.parse(storedGifs);

    if (hasFavourites === "true") {
      favNoContent.classList.add("hidden");

      if (storedGifsArray.length <= 12) {
        loadFavesMobile(offset, storedGifsArray.length, storedGifsArray);
        console.log(offset);
      } else if (storedGifsArray.length > 12) {
        verMasBtn.style.display = "block";
        loadFavesMobile(offset, 12, storedGifsArray);
        offset += 12;
        console.log(offset);
        verMasBtn.classList.remove("hidden");
      }

      addAndRemoveFavsMobile();
    }
    else if (hasFavourites === false) {
      favNoContent.style.display = "block";
    }
  }

  verMasBtn.addEventListener("click", () => {
    loadMoreGifsMobile();
  })
}

//document.addEventListener("DOMContentLoaded", displayIconsOnHover, true);


showFavourites();

function loadFaves(offset, dataLength, storedGifs) {
  for (let i = offset; i < dataLength; i++) {
    favedGifId = storedGifs[i];

    const gifContainer = document.createElement("section");
    const img = document.createElement("img");
    const gifOverlay = document.createElement("div");

    fetchGif(favedGifId, APIkey).then(data => {
      img.src = data.data.images.fixed_height.url;
      img.id = data.data.id;
      createGifInfo(gifOverlay, data.data);
    }).catch(e => {
      console.log(e)
      console.log("Lo sentimos, puede que algunos de los gifs guardados ya no existan en Giphy");
    });

    img.setAttribute("class", "faved-gifs");
    img.classList.add("faved-gif");
    gifContainer.setAttribute("class", "gif-container");
    gifOverlay.setAttribute("class", "gif-overlay");

    gifContainer.appendChild(img);
    gifContainer.appendChild(gifOverlay);
    favContent.appendChild(gifContainer);

    createGifIcons(gifOverlay);

    displayIconsOnHover(gifOverlay);

    // maxGif();

    // addAndRemoveFavourites();
  }

  maxGif();

  addAndRemoveFavourites();
  //setTimeout(displayIconsOnHover, 500);
  //displayIconsOnHover();
}



function loadMoreGifs() {
  console.log(offset);
  if ((storedGifsArray.length - offset) > 12) {
    loadFaves(offset, offset + 12, storedGifsArray);
    offset += 12;
    console.log(offset);
  } else {
    loadFaves(offset, storedGifsArray.length, storedGifsArray);
    offset += (storedGifsArray.length - offset)
  }
  if (storedGifsArray.length === offset) {
    verMasBtn.style.display = "none";
  }
}

function loadFavesMobile(offset, dataLength, storedGifs) {

  for (let i = offset; i < dataLength; i++) {
    favedGifId = storedGifs[i];

    const gifContainer = document.createElement("section");
    const img = document.createElement("img");
    const gifOverlay = document.createElement("div");

    fetchGif(favedGifId, APIkey).then(data => {
      img.src = data.data.images.fixed_height.url;
      img.id = data.data.id;
      createGifInfo(gifOverlay, data.data);
    }).catch(e => {
      console.log(e)
      console.log("Lo sentimos, puede que algunos de los gifs guardados ya no existan en Giphy");
    });

    img.setAttribute("class", "faved-gifs");
    img.classList.add("gif");
    img.classList.add("faved-gif");
    gifContainer.setAttribute("class", "gif-container");
    gifOverlay.setAttribute("class", "gif-overlay");

    gifContainer.appendChild(img);
    gifContainer.appendChild(gifOverlay);
    favContent.appendChild(gifContainer);
  }

  addAndRemoveFavsMobile();
}


function loadMoreGifsMobile() {
  console.log(offset);
  if ((storedGifsArray.length - offset) > 12) {
    loadFavesMobile(offset, offset + 12, storedGifsArray);
    offset += 12;
    console.log(offset);
    maxGif();
  } else {
    loadFavesMobile(offset, storedGifsArray.length, storedGifsArray);
    offset += (storedGifsArray.length - offset)
    maxGif();
  }
  if (storedGifsArray.length === offset) {
    verMasBtn.style.display = "none";
  }
}



// if (window.matchMedia("(min-width: 1024px)").matches) {
//   menu.style.marginLeft = "35%";
//   function showFavourites() {
//     const hasFavourites = localStorage.getItem("has-favourites");
//     const storedGifs = localStorage.getItem("faved-gifs");
//     const storedGifsArray = JSON.parse(storedGifs);

//     if (hasFavourites === "true") {
//       favNoContent.classList.add("hidden");

//       for (let gifId of storedGifsArray) { 
//         const gifContainer = document.createElement("section");
//         const img = document.createElement("img");
//         const gifOverlay = document.createElement("div");
//         img.setAttribute("class", "faved-gifs");
//         img.classList.add("faved-gif");
//         gifContainer.setAttribute("class", "gif-container");
//         gifOverlay.setAttribute("class", "gif-overlay");
//         favedGifId = gifId;

//         fetchGif(favedGifId, APIkey).then(data => {
//           img.src = data.data.images.fixed_height.url;
//           img.id = data.data.id;
//           createGifInfo(gifOverlay, data.data);
//         }).catch(e => {
//           console.log(e)
//           console.log("Lo sentimos, puede que algunos de los gifs guardados ya no existan en Giphy");
//         });

//         gifContainer.appendChild(img);
//         gifContainer.appendChild(gifOverlay);
//         favContent.appendChild(gifContainer);

//         createGifIcons(gifOverlay);

//         displayIconsOnHover(gifOverlay);
//       }

//       //displayIconsOnHover();

//       // if (storedGifsArray.length > 12) {
//       //   verMasBtn.style.display = "block";
//       // }

//     } else if (hasFavourites === false) {
//       favNoContent.style.display = "block";
//     }
//   }

// }else {
//   function showFavourites() {
//     const hasFavourites = localStorage.getItem("has-favourites");
//     const storedGifs = localStorage.getItem("faved-gifs");
//     const storedGifsArray = JSON.parse(storedGifs);

//     if (hasFavourites === "true") {
//       favNoContent.classList.add("hidden");

//       for (let gifId of storedGifsArray) { 
//         const gifContainer = document.createElement("section");
//         const img = document.createElement("img");
//         const gifOverlay = document.createElement("div");
//         img.setAttribute("class", "faved-gifs");
//         img.classList.add("gif");
//         img.classList.add("faved-gif");
//         gifContainer.setAttribute("class", "gif-container");
//         gifOverlay.setAttribute("class", "gif-overlay");
//         favedGifId = gifId;

//         fetchGif(favedGifId, APIkey).then(data => {
//           img.src = data.data.images.fixed_height.url;
//           img.id = data.data.id;
//           createGifInfo(gifOverlay, data.data);
//         }).catch(e => {
//           console.log(e);
//           console.log("Lo sentimos, puede que algunos de los gifs guardados ya no existan en Giphy");
//           });

//         gifContainer.appendChild(img);
//         gifContainer.appendChild(gifOverlay);
//         favContent.appendChild(gifContainer);

//       }

//       addAndRemoveFavsMobile();

//       //maxGif();

//     } else if (hasFavourites === false) {
//       favNoContent.style.display = "block";
//     }
//   }
// }


// showFavourites();