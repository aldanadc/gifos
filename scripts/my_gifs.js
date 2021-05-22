const myGifsNoContent = document.getElementById("mis-gifos-no-content");
const noContentP = document.querySelector("#mis-gifos-no-content p");
const myGifsContent = document.getElementById("mis-gifos-with-content");
const myGifsAnchor = document.querySelector("#menu li:nth-of-type(3) a");
const verMasBtn = document.querySelector("#ver-mas-my-gifs");
const hasmyGifs = localStorage.getItem("has-my-gifs");
const myStoredGifs = localStorage.getItem("my-gifs");
const myStoredGifsArray = JSON.parse(myStoredGifs);
let myGifId;
let offset = 0;

myGifsAnchor.style.color = "#9CAFC3";


function loadMyGifs(offset, dataLength, storedGifs) {
  for (let i=offset; i < dataLength; i++) {
    myGifId = storedGifs[i];

    const gifContainer = document.createElement("section");
    const img = document.createElement("img");
    const gifOverlay = document.createElement("div");

    fetchGif(myGifId, APIkey).then(data => {
      img.src = data.data.images.fixed_height.url;
      img.id = data.data.id;
      createGifInfo(gifOverlay, data.data);
    }).catch(e => {
      console.log(e)
      alert("Lo sentimos, puede que algunos de los gifs guardados ya no existan en Giphy y no se muestren correctamente.");
    });

    img.setAttribute("class", "my-gif");
    gifContainer.setAttribute("class", "gif-container");
    gifOverlay.setAttribute("class", "gif-overlay");

    gifContainer.appendChild(img);
    gifContainer.appendChild(gifOverlay);
    myGifsContent.appendChild(gifContainer);

    createMyGifIcons(gifOverlay);

    displayIconsOnHover(gifOverlay);
  }
  
  trashIconsOnHover();
  
  removeFromMyGifs();

  maxGif();
}


function loadMyGifsMobile(offset, dataLength, storedGifs) {
  for (let i=offset; i < dataLength; i++) {
    myGifId = storedGifs[i];

    const gifContainer = document.createElement("section");
    const img = document.createElement("img");
    const gifOverlay = document.createElement("div");

    fetchGif(myGifId, APIkey).then(data => {
      img.src = data.data.images.fixed_height.url;
      img.id = data.data.id;
      createGifInfo(gifOverlay, data.data);
    }).catch(e => {
      console.log(e);
      alert("Lo sentimos, puede que algunos de los gifs guardados ya no existan en Giphy y no se muestren correctamente.");
    });

    img.setAttribute("class", "my-gif");
    img.classList.add("gif");
    gifContainer.setAttribute("class", "gif-container");
    gifOverlay.setAttribute("class", "gif-overlay");

    gifContainer.appendChild(img);
    gifContainer.appendChild(gifOverlay);
    myGifsContent.appendChild(gifContainer);
  }

  maxMyGifs();
}

if (window.matchMedia("(min-width: 1024px)").matches) {
  menu.style.marginLeft = "35%";
  function showMyGifs() {

    if (hasmyGifs === "true") {
      myGifsNoContent.classList.add("hidden");

      if (myStoredGifsArray.length <= 12) {
        loadMyGifs(offset, myStoredGifsArray.length, myStoredGifsArray);
      }else if (myStoredGifsArray.length > 12) {
        verMasBtn.style.display = "block";
        loadMyGifs(offset, 12, myStoredGifsArray);
        offset += 12;
        verMasBtn.classList.remove("hidden");
      }

    }else if (hasmyGifs === "false") {
      myGifsNoContent.style.display = "block";
    }

    verMasBtn.addEventListener("click", () => {
      loadMoreMyGifs();
    })
  }
}else {
  function showMyGifs() {

    if (hasmyGifs === "true") {
      myGifsNoContent.classList.add("hidden");

      if (myStoredGifsArray.length <= 12) {
        loadMyGifsMobile(offset, myStoredGifsArray.length, myStoredGifsArray);
      }else if (myStoredGifsArray.length > 12) {
        verMasBtn.style.display = "block";
        loadMyGifsMobile(offset, 12, myStoredGifsArray);
        offset += 12;
        verMasBtn.classList.remove("hidden");
      }

    }else if (hasmyGifs === "false") {
      myGifsNoContent.style.display = "block";
      noContentP.textContent = "¡Anímate a crear tu primer GIFO! Visítanos desde tu laptop o pc";
    }
  }

  verMasBtn.addEventListener("click", () => {
    loadMoreMyGifsMobile();
  })
}


function loadMoreMyGifs() {
  if ((myStoredGifsArray.length - offset) > 12) {
    loadMyGifs(offset, offset + 12, myStoredGifsArray);
    offset += 12;
  }else {
    loadMyGifs(offset, myStoredGifsArray.length, myStoredGifsArray);
    offset += (myStoredGifsArray.length - offset)
  }

  if (myStoredGifsArray.length === offset) {
    verMasBtn.style.display = "none";
  }
}


function loadMoreMyGifsMobile() {
  if ((myStoredGifsArray.length - offset) > 12) {
    loadMyGifsMobile(offset, offset + 12, myStoredGifsArray);
    offset += 12;
    maxGif();
  } else {
    loadMyGifsMobile(offset, myStoredGifsArray.length, myStoredGifsArray);
    offset += (myStoredGifsArray.length - offset)
    maxGif();
  }

  if (myStoredGifsArray.length === offset) {
    verMasBtn.style.display = "none";
  }
}



function maxMyGifs() {
  const myGifs = document.querySelectorAll(".my-gif");
  myGifs.forEach(gif => {
    gif.addEventListener("click", () => {
      const maxContainer = document.createElement("div");
      const maxedGif = document.createElement("img");
      const closeBtn = document.createElement("img");
      const trashIcon = document.createElement("img");
      const downloadIcon = document.createElement("img");
      const gifOverlay = document.createElement("div");
      maxContainer.classList.add("max-container");
      maxedGif.classList.add("maxed-gif");
      gifOverlay.setAttribute("class", "gif-overlay");
      gifId = gif.id;

      fetchGif(gifId, APIkey).then(data => {
        maxedGif.src = data.data.images.original.url;
        maxedGif.id = data.data.id;
        createGifInfo(gifOverlay, data.data);
      }).catch(e => console.log(e));

      closeBtn.setAttribute("src", "images/close.svg");
      closeBtn.classList.add("close-icon");

      const darkMode = localStorage.getItem("dark-mode-active");
      if (darkMode === "true") {
        closeBtn.setAttribute("src", "images/close-modo-noct.svg");
      }else {
        closeBtn.setAttribute("src", "images/close.svg");
      }

      trashIcon.src = "images/icon-trash-normal.svg";
      downloadIcon.src = "images/icon-download.svg";
      trashIcon.classList.add("trash-icon");
      downloadIcon.classList.add("download-icon");

      document.body.appendChild(maxContainer);
      maxContainer.appendChild(closeBtn);
      maxContainer.appendChild(maxedGif);
      maxContainer.appendChild(gifOverlay);
      gifOverlay.appendChild(trashIcon);
      gifOverlay.appendChild(downloadIcon);

      closeBtn.addEventListener("click", () => {
        document.body.removeChild(maxContainer);
      })

      downloadMaxedGif();

      removeFromMyGifsMobile();
    })
  })
}


showMyGifs();


function createMyGifIcons(eachOverlayDiv) {
    const iconsWrapper = document.createElement("div");
    const trashIcon = document.createElement("img");
    const downloadIcon = document.createElement("img");
    const maxIcon = document.createElement("img");
    iconsWrapper.setAttribute("class", "icons-wrapper");
    trashIcon.setAttribute("src", "images/icon-trash-normal.svg");
    trashIcon.setAttribute("class", "trash-icon");
    downloadIcon.setAttribute("src", "images/icon-download.svg");
    downloadIcon.setAttribute("class", "download-icon");
    maxIcon.setAttribute("src", "images/icon-max-normal.svg");
    maxIcon.setAttribute("class", "max-icon");
    iconsWrapper.appendChild(trashIcon);
    iconsWrapper.appendChild(downloadIcon);
    iconsWrapper.appendChild(maxIcon);
    eachOverlayDiv.appendChild(iconsWrapper);
}

function trashIconsOnHover() {
  const trashIcons = document.querySelectorAll(".trash-icon");

  trashIcons.forEach(icon => {
    icon.addEventListener("mouseenter", () => {
      icon.src = "images/icon-trash-hover.svg";
    })

    icon.addEventListener("mouseout", () => {
      icon.src = "images/icon-trash-normal.svg";
    })
  })
}


function removeFromMyGifs() {
  const trashIcons = document.querySelectorAll(".trash-icon");

  trashIcons.forEach(icon => {
    icon.addEventListener("click", () => {
      const myStoredGifs = localStorage.getItem("my-gifs");
      const myStoredGifsArray = JSON.parse(myStoredGifs);
      const iconWrapper = icon.parentElement;
      const overlay = iconWrapper.parentElement;
      const gif = overlay.previousElementSibling;
      const findIndex = myStoredGifsArray.findIndex(gifId => gifId === gif.id);

      if (findIndex != -1) { //ENCUENTRA ID, LO QUITA DE MYGIFS
        myStoredGifsArray.splice(findIndex, 1);

        if (myStoredGifsArray.length === 0) {
          localStorage.setItem("has-my-gifs", false)
        }

        localStorage.setItem("my-gifs", JSON.stringify(myStoredGifsArray));
      }
    })
  })
}

function removeFromMyGifsMobile() {
  const trashIcons = document.querySelectorAll(".trash-icon");
  trashIcons.forEach(icon => {
    icon.addEventListener("click", () => {
      const myStoredGifs = localStorage.getItem("my-gifs");
      const myStoredGifsArray = JSON.parse(myStoredGifs);
      const overlay = icon.parentElement;
      const gif = overlay.previousElementSibling;
      const findIndex = myStoredGifsArray.findIndex(gifId => gifId === gif.id);

      if (findIndex != -1) { //ENCUENTRA ID, LO QUITA DE MYGIFS
        myStoredGifsArray.splice(findIndex, 1);

        if (myStoredGifsArray.length === 0) {
          localStorage.setItem("has-my-gifs", false)
        }

        localStorage.setItem("my-gifs", JSON.stringify(myStoredGifsArray));
      }
    })
  })
}
