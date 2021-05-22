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
      } else if (storedGifsArray.length > 12) {
        verMasBtn.style.display = "block";
        loadFaves(offset, 12, storedGifsArray);
        offset += 12;
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

    if (hasFavourites === "true") {
      favNoContent.classList.add("hidden");

      if (storedGifsArray.length <= 12) {
        loadFavesMobile(offset, storedGifsArray.length, storedGifsArray);
      } else if (storedGifsArray.length > 12) {
        verMasBtn.style.display = "block";
        loadFavesMobile(offset, 12, storedGifsArray);
        offset += 12;
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
      console.log(e);
      alert("Lo sentimos, puede que algunos de los gifs guardados ya no existan en Giphy y no se muestren correctamente.");
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

  }

  maxGif();

  addAndRemoveFavourites();

}



function loadMoreGifs() {
  if ((storedGifsArray.length - offset) > 12) {
    loadFaves(offset, offset + 12, storedGifsArray);
    offset += 12;
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
      console.log(e);
      alert("Lo sentimos, puede que algunos de los gifs guardados ya no existan en Giphy y no se muestren correctamente.");
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
  if ((storedGifsArray.length - offset) > 12) {
    loadFavesMobile(offset, offset + 12, storedGifsArray);
    offset += 12;
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


