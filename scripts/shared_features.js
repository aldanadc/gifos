//MENÚ HAMBURGUESA
const APIkey = "xuMDkSg7dnKR2qernbZ0b58a42n5X2Bn";
const burger = document.getElementById("burger");
const trendGifsWrapper = document.getElementById("trend-gif-wrapper");
const trendingSection = document.querySelector("#trending-section");
const sliderRight = document.getElementById("btn-slider-right");
const sliderLeft = document.getElementById("btn-slider-left");
const facebookIcon = document.getElementById("fb-icon");
const twitterIcon = document.getElementById("twitter-icon");
const instaIcon = document.getElementById("insta-icon");
const createBtn = document.getElementById("btn-create");
let trendingOffset = 0;


const showMenu = () => {
  const menu = document.getElementById("menu");
  const darkMode = localStorage.getItem("dark-mode-active");
  if (menu.classList.contains("show-menu")) {
    menu.classList.remove("show-menu");
    if (darkMode === "true") {
      burger.src = "images/burger-modo-noct.svg";
    }else {
      burger.src = "images/burger.svg";
    }
  }else {
    menu.classList.add("show-menu");
    menu.style.zIndex = "2";
    if (darkMode === "true") {
      burger.src = "images/close-modo-noct.svg";
    }else {
      burger.src = "images/close.svg";
    }
  }
}

burger.addEventListener("click", () => {

  showMenu();

})


if (window.matchMedia("(min-width: 1024px)").matches) {
  //OBTENER INFO GIFS TRENDING
  const getTrendingGifs = async () => {
  const trendingGifsUrl = `https://api.giphy.com/v1/gifs/trending?api_key=${APIkey}&limit=3&offset=${trendingOffset}`;
  const response = await fetch(trendingGifsUrl);
  const data = await response.json();
  return data
  };

  getTrendingGifs()
    .then(data => {

    displayTrendingGifs(data, 3);

    maxGif();

    downloadGif();

    addAndRemoveFavourites();

  });

  function displayTrendingGifs(data, dataLength) {

    for (let i = 0; i < dataLength; i++) {
      const gifContainer = document.createElement("section");
      const trendingGif = document.createElement("img");
      const gifOverlay = document.createElement("div");
      gifContainer.setAttribute("class", "gif-container");
      trendingGif.setAttribute("class", "trending-gifs");
      //trendingGif.classList.add("gif");
      trendingGif.setAttribute("src", data.data[i].images.fixed_height.url);
      trendingGif.setAttribute("id", data.data[i].id);
      trendGifsWrapper.appendChild(gifContainer);
      gifOverlay.setAttribute("class", "gif-overlay");
      gifContainer.appendChild(trendingGif);
      gifContainer.appendChild(gifOverlay);
      
      createGifIcons(gifOverlay);
  
      createGifInfo(gifOverlay, data.data[i]);
  
      displayIconsOnHover(gifOverlay);
  
    }
  
    changeIconsOnHover();
  }

  //TRAER MÁS GIFS TRENDING
  sliderRight.addEventListener("click", () => {
    trendingOffset = trendingOffset + 1;
    const getMoreTrendingGifs = async () => {
      const trendingGifsUrl = `https://api.giphy.com/v1/gifs/trending?api_key=${APIkey}&limit=1&offset=${trendingOffset}`;
      const response = await fetch(trendingGifsUrl);
      const data = await response.json();
      return data
    };

    getMoreTrendingGifs()
      .then(data => {
        console.log(data);

        displayTrendingGifs(data, 1);

        maxGif();

        addAndRemoveFavourites();
      });
      

      sliderRight.style.marginLeft = "22px";

      //wrapper.scrollRight += 3000;
      trendGifsWrapper.scrollBy({
      top: 0,
      left: 297,
      behavior: 'smooth'
      });
  })

  sliderLeft.addEventListener("click", () => {
    trendGifsWrapper.scrollBy({
      top: 0,
      left: -297,
      behavior: 'smooth'
      });
  })

}else { //SI EL DISPOSITIVO ES PEQUEÑO
  const getTrendingGifs = async () => {
  const trendingGifsUrl = `https://api.giphy.com/v1/gifs/trending?api_key=${APIkey}&limit=15`;
  const response = await fetch(trendingGifsUrl);
  const data = await response.json();
  return data
  };
  
  getTrendingGifs()
    .then(data => {

    displayTrendingGifs(data); //ACÁ DECÍA 1 FOR WHATEVER REASON

    maxGif();

    addAndRemoveFavsMobile();

  });

  function displayTrendingGifs(data) {
    for (let i = 0; i < 15; i++) {
      const gifContainer = document.createElement("section");
      const trendingGif = document.createElement("img");
      const gifOverlay = document.createElement("div");
      gifContainer.setAttribute("class", "gif-container");
      trendingGif.setAttribute("class", "trending-gifs");
      trendingGif.classList.add("gif");
      trendingGif.setAttribute("src", data.data[i].images.fixed_height.url);
      trendingGif.setAttribute("id", data.data[i].id);
      trendGifsWrapper.appendChild(gifContainer);
      gifOverlay.setAttribute("class", "gif-overlay");
      gifContainer.appendChild(trendingGif);
      gifContainer.appendChild(gifOverlay);
      
      createGifIcons(gifOverlay);
  
      createGifInfo(gifOverlay, data.data[i]);
    }
  }
}




function checkIfFaved(icon) {
  //const favIcons = document.querySelectorAll(".fav-icon");
  const iconWrapper = icon.parentElement;
  const overlay = iconWrapper.parentElement;
  const gif = overlay.previousElementSibling;
  if (gif.classList.contains("faved-gif")) {
    icon.src = "images/icon-fav-active.svg";
  }else if (gif.classList.contains("my-gif")){
    icon.src = "images/icon-trash-normal.svg";
    icon.classList.add("trash-icon");
    icon.classList.remove("fav-icon");
  }
}



if (window.matchMedia("(min-width: 1024px)").matches) {
  function checkIfFavedTwo(icon) {
    const storedGifs = localStorage.getItem("faved-gifs");
    const storedGifsArray = JSON.parse(storedGifs);
    const iconWrapper = icon.parentElement;
    const overlay = iconWrapper.parentElement;
    const gif = overlay.previousElementSibling;
    const findIndex = storedGifsArray.findIndex(gifId => gifId === gif.id);
      if (findIndex === -1) {
        icon.src = "images/icon-fav.svg";
      }else {
        //console.log("esto corrrió");
        //icon.src = "images/icon-fav-active.svg";
        gif.classList.add("faved-gif");
      }
  }
}else {
  function checkIfFavedTwo(icon) { //ESTO ESTÁ OPERANDO SOLO SOBRE TRENDING
    const storedGifs = localStorage.getItem("faved-gifs");
    const storedGifsArray = JSON.parse(storedGifs);
    const iconWrapper = icon.parentElement;
    const overlay = iconWrapper.parentElement;
    const gif = overlay.previousElementSibling;
    const findIndex = storedGifsArray.findIndex(gifId => gifId === gif.id);
    if (findIndex === -1) {
      icon.src = "images/icon-fav.svg";
      //console.log("puso ícono fav normal");
    }else {
      gif.classList.add("faved-gif");
      //console.log("agregó clase"); //AGREGA FAVED GIF A GIFS EN TRENDING
      //icon.src = "images/icon-fav-active.svg";
    }
  }
}





//CREAR DIV PARA ÍCONOS
function createGifIcons(eachOverlayDiv) {
  //CREA UN SOLO GRUPO DE ÍCONOS POR CADA DIV
    const iconsWrapper = document.createElement("div");
    const favIcon = document.createElement("img");
    const downloadIcon = document.createElement("img");
    const maxIcon = document.createElement("img");
    iconsWrapper.setAttribute("class", "icons-wrapper");
    //favIcon.setAttribute("src", "images/icon-fav.svg");
    favIcon.setAttribute("class", "fav-icon");
    downloadIcon.setAttribute("src", "images/icon-download.svg");
    downloadIcon.setAttribute("class", "download-icon");
    maxIcon.setAttribute("src", "images/icon-max-normal.svg");
    maxIcon.setAttribute("class", "max-icon");
    iconsWrapper.appendChild(favIcon);
    iconsWrapper.appendChild(downloadIcon);
    iconsWrapper.appendChild(maxIcon);
    eachOverlayDiv.appendChild(iconsWrapper);

    const hasFav = localStorage.getItem("has-favourites");

    if (hasFav === "true") {
      checkIfFavedTwo(favIcon); //PONE CORAZÓN EN SECCIÓN TRENDING
      checkIfFaved(favIcon); //PONE CORAZÓN FAV EN SECCIÓN FAV
    }
    else{
      favIcon.setAttribute("src", "images/icon-fav.svg");
    }
}

//MOSTRAR CON HOVER LOS ÍCONOS CREADOS SOBRE CADA DIV
//let iconWrapper = document.getElementsByClassName("icon-wrapper");
function displayIconsOnHover(eachGifOverlay) {
  eachGifOverlay.addEventListener("mouseover", () => {
    for (let i = 0; i < 3; i++) {
      eachGifOverlay.children[i].style.visibility = "visible";
    }
  })

  eachGifOverlay.addEventListener("mouseout", () => {
    for (let i = 0; i < 3; i++) {
      eachGifOverlay.children[i].style.visibility = "hidden";
    }
  })
}

//CAMBIAR ÍCONOS HACIENDO HOVER
function changeIconsOnHover() {
  const iconsFav = document.querySelectorAll(".fav-icon");
  const storedGifs = localStorage.getItem("faved-gifs");
  const storedGifsArray = JSON.parse(storedGifs);

  iconsFav.forEach(icon => {
  //   icon.addEventListener("mouseenter", () => {
  //     icon.src = "images/icon-fav-hover.svg";
  //   })

  //   icon.addEventListener("mouseout", () => {
  //         icon.src = "images/icon-fav.svg";
  //   })
  // })

    icon.addEventListener("mouseenter", () => {
      const iconWrapper = icon.parentElement;
      const overlay = iconWrapper.parentElement;
      const gif = overlay.previousElementSibling;
      const hasFav = localStorage.getItem("has-favourites");
      if (hasFav === "true" ) {
        const findIndex = storedGifsArray.findIndex(gifId => gifId === gif.id);
        if (findIndex === -1) {
          icon.src = "images/icon-fav-hover.svg";
        }else {
          icon.src = "images/icon-fav-active.svg";
        }
      }else {
        icon.src = "images/icon-fav-hover.svg";
      }
    })
  })
  //   icon.addEventListener("mouseout", () => {
  //     const iconWrapper = icon.parentElement;
  //     const overlay = iconWrapper.parentElement;
  //     const gif = overlay.previousElementSibling;
  //     const hasFav = localStorage.getItem("has-favourites");
  //     if (hasFav === "true" ) {
  //       const findIndex = storedGifsArray.findIndex(gifId => gifId === gif.id);
  //       if (findIndex === -1) {
  //         icon.src = "images/icon-fav.svg";
  //       }else {
  //         icon.src = "images/icon-fav-active.svg";
  //       }
  //     }else {
  //       icon.src = "images/icon-fav.svg";
  //     }
  //   })
    //   const iconWrapper = icon.parentElement;
    //   const overlay = iconWrapper.parentElement;
    //   const gif = overlay.previousElementSibling;
    //   if (gif.classList.contains("faved-gif")) {
    //     icon.src = "images/icon-fav-active.svg";
    //   }else {
    //     icon.src = "images/icon-fav-hover.svg";
    //   }
    // })
    //   icon.addEventListener("mouseout", () => {
    //     const iconWrapper = icon.parentElement;
    //     const overlay = iconWrapper.parentElement;
    //     const gif = overlay.previousElementSibling;
    //     if (gif.classList.contains("faved-gif")) {
    //       icon.src = "images/icon-fav-active.svg";
    //     }else {
    //       icon.src = "images/icon-fav-hover.svg";
    //     }
    //   })
  //   icon.addEventListener("mouseenter", () => {
  //   const storedGifs = localStorage.getItem("faved-gifs");
  //   const storedGifsArray = JSON.parse(storedGifs);
  //   const iconWrapper = icon.parentElement;
  //   const overlay = iconWrapper.parentElement;
  //   const gif = overlay.previousElementSibling;
  //   if (gif.classList.contains("faved-gif")) {
  //     icon.src = "images/icon-fav-active.svg";
  //   }else {
  //     icon.src = "images/icon-fav-hover.svg";
  //   }
  // })
  //   icon.addEventListener("mouseout", () => {
  //     const iconWrapper = icon.parentElement;
  //     const overlay = iconWrapper.parentElement;
  //     const gif = overlay.previousElementSibling;
  //     if (gif.classList.contains("faved-gif")) {
  //       icon.src = "images/icon-fav-active.svg";
  //     }else {
  //       icon.src = "images/icon-fav-hover.svg";
  //     }
  //   })


  const iconsDown = document.querySelectorAll(".download-icon");

  iconsDown.forEach(icon => {
    icon.addEventListener("mouseenter", () => {
      icon.src = "images/icon-download-hover.svg";
    })

    icon.addEventListener("mouseout", () => {
      icon.src = "images/icon-download.svg";
    })
  })

  const iconsMax = document.querySelectorAll(".max-icon");

  iconsMax.forEach(icon => {
    icon.addEventListener("mouseenter", () => {
      icon.src = "images/icon-max-hover.svg";
    })

    icon.addEventListener("mouseout", () => {
      icon.src = "images/icon-max-normal.svg";
    })
  })
}


//CREA USER Y TÍTULO DE CADA GIF
function createGifInfo(gifOverlay, data) {
  const gifUser = document.createElement("p");
  const gifTitle = document.createElement("p");
  gifUser.setAttribute("class", "gif-user");
  gifUser.classList.add("robot-reg");
  gifTitle.setAttribute("class", "gif-title");
  gifTitle.classList.add("robot-bold");
  gifUser.textContent = data.username;
  gifTitle.textContent = data.title;
  gifOverlay.appendChild(gifUser);
  gifOverlay.appendChild(gifTitle);
}

let gifId;

const fetchGif = async (gifId, APIkey) => {
  const response = await fetch(`https://api.giphy.com/v1/gifs/${gifId}?api_key=${APIkey}`);
  const data = await response.json();
  return data
}

if (window.matchMedia("(min-width: 1024px)").matches) {
  function maxGif() {
    const maxIcons = document.querySelectorAll(".max-icon");
    maxIcons.forEach(icon => {
      icon.onclick = () => {
        const iconWrapper = icon.parentElement;
        const overlay = iconWrapper.parentElement;
        const gif = overlay.previousElementSibling;
        const maxContainer = document.createElement("div");
        const maxedGif = document.createElement("img");
        const closeBtn = document.createElement("img");
        const favIcon = document.createElement("img");
        const downloadIcon = document.createElement("img");
        const gifOverlay = document.createElement("div");
        maxContainer.classList.add("max-container");
        maxedGif.classList.add("maxed-gif");
        gifOverlay.setAttribute("class", "gif-overlay");
        gifId = gif.id;
        console.log(gifId);
  
        fetchGif(gifId, APIkey).then(data => {
          maxedGif.src = data.data.images.original.url;
          maxedGif.id = data.data.id;
          console.log(maxedGif.id);
          createGifInfo(gifOverlay, data.data);
        })
  
        closeBtn.classList.add("close-icon");

        const darkMode = localStorage.getItem("dark-mode-active");
        if (darkMode === "true") {
          closeBtn.setAttribute("src", "images/close-modo-noct.svg");
        }else {
          closeBtn.setAttribute("src", "images/close.svg");
        }
        
        downloadIcon.src = "images/icon-download.svg";
        favIcon.classList.add("fav-icon");
        downloadIcon.classList.add("download-icon");
        document.body.appendChild(maxContainer);
        maxContainer.appendChild(closeBtn);
        maxContainer.appendChild(maxedGif);
        maxContainer.appendChild(gifOverlay);
        gifOverlay.appendChild(favIcon);
        gifOverlay.appendChild(downloadIcon);
  
        closeBtn.addEventListener("click", () => {
          document.body.removeChild(maxContainer);
        })
  
        downloadMaxedGif();

        addAndRemoveFavsMaxedGifs();

        checkedMaxGifFaved(gifId, maxedGif);
      }
    })
  }
}else {
  function maxGif() {
    const allGifs = document.querySelectorAll(".gif");
    allGifs.forEach(gif => {
      gif.addEventListener("click", () => {
        const maxContainer = document.createElement("div");
        const maxedGif = document.createElement("img");
        const closeBtn = document.createElement("img");
        const favIcon = document.createElement("img");
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
        })
  
        closeBtn.setAttribute("src", "images/close.svg");
        closeBtn.classList.add("close-icon");

        //LA CLASE FAV PARECE ASIGNARSE BIEN EN TRENDING Y EN SECCIÓN FAV
        //ESTO ESTÁ BIEN, NO TOCAR MÁS! ASIGNA BIEN LOS BOTONES
        if (maxedGif.classList.contains("faved-gifs")) {
          //favIcon.src = "images/icon-fav-active.svg";
        }else if (gif.classList.contains("faved-gif")){
          favIcon.src = "images/icon-fav-active.svg"; //ESTO TAMBIÉN!
        }else { //NO SACAR ESTO, SIRVE!!!
          favIcon.src = "images/icon-fav.svg";
        }

        downloadIcon.src = "images/icon-download.svg";
        favIcon.classList.add("fav-icon");
        downloadIcon.classList.add("download-icon");
  
        document.body.appendChild(maxContainer);
        maxContainer.appendChild(closeBtn);
        maxContainer.appendChild(maxedGif);
        maxContainer.appendChild(gifOverlay);
        gifOverlay.appendChild(favIcon);
        gifOverlay.appendChild(downloadIcon);
  
        closeBtn.addEventListener("click", () => {
          document.body.removeChild(maxContainer);
        })

        downloadMaxedGif();

        addAndRemoveFavsMobile();

      })
    })
  }  
}



function checkIfFavedMax(icon) {
  console.log(icon);
  const storedGifs = localStorage.getItem("faved-gifs");
  const storedGifsArray = JSON.parse(storedGifs);
  const overlay = icon.parentElement;
  console.log(overlay);
  //const overlay = iconWrapper.parentElement;
  const gif = overlay.previousElementSibling;
  const findIndex = storedGifsArray.findIndex(gifId => gifId === gif.id);
  if (findIndex != -1) {
    gif.classList.add("faved-gif");
    console.log("Class added");
    //console.log("puso ícono fav normal");
  }
}

//SOLO DESKTOP
function checkedMaxGifFaved(gifIdParam, maxedGif) {
  const hasFav = localStorage.getItem("has-favourites");
  if (hasFav === "true") {
    const storedGifs = localStorage.getItem("faved-gifs");
    const storedGifsArray = JSON.parse(storedGifs);
    const findIndex = storedGifsArray.findIndex(gifId => gifId === gifIdParam);
    console.log(gifIdParam);
    if (findIndex === -1) {
      const overlay = maxedGif.nextElementSibling;
      const favIcon = overlay.firstChild;
      favIcon.src = "images/icon-fav.svg";
    }else {
      const overlay = maxedGif.nextElementSibling;
      const favIcon = overlay.firstChild;
      maxedGif.classList.add("faved-gif");
      favIcon.src = "images/icon-fav-active.svg";
    }
  }else{
    const overlay = maxedGif.nextElementSibling;
    const favIcon = overlay.firstChild;
    favIcon.setAttribute("src", "images/icon-fav.svg");
  }
}


function downloadGif() {
  const download = document.querySelectorAll(".download-icon");

  download.forEach(icon => {
    icon.addEventListener("click", async () => {
      const iconWrapper = icon.parentElement;
      const overlay = iconWrapper.parentElement;
      const title = overlay.children[2].textContent;
      const gif = overlay.previousElementSibling;
      let blob = await fetch(gif.src)
      .then(gif => gif.blob());
      invokeSaveAsDialog(blob, `${title}.gif`);
    })
  });
}

function downloadMaxedGif() {
  const download = document.querySelectorAll(".download-icon");

  download.forEach(icon => {
    icon.addEventListener("click", async () => {
      const overlay = icon.parentElement;
      const title = overlay.children[3].textContent;
      const gif = overlay.previousElementSibling;
      let blob = await fetch(gif.src)
      .then(gif => gif.blob());
      invokeSaveAsDialog(blob, `${title}.gif`);
    })
  });
}

function changesOnHover() {
  //CREATE GIF BUTTON
  createBtn.addEventListener("mouseenter", () => {
    createBtn.src = "images/CTA-crear-gifo-hover.svg";
  })

  createBtn.addEventListener("mouseout", () => {
    createBtn.src = "images/button-crear-gifo.svg";
  })

  createBtn.addEventListener("click", () => {
    createBtn.src = "images/CTA-crear-gifo-active.svg";
  })
  //SLIDERS
  sliderRight.addEventListener("mouseenter", () => {
    sliderRight.src = "images/Button-Slider-right-hover.svg";
  })

  sliderRight.addEventListener("mouseout", () => {
    sliderRight.src = "images/Button-Slider-right.svg";
  })

  sliderLeft.addEventListener("mouseenter", () => {
    sliderLeft.src = "images/button-slider-left-hover.svg";
  })

  sliderLeft.addEventListener("mouseout", () => {
    sliderLeft.src = "images/button-slider-left.svg";
  })
//FOOTER
  facebookIcon.addEventListener("mouseenter", () => {
    facebookIcon.src = "images/icon_facebook_hover.svg";
  })

  facebookIcon.addEventListener("mouseout", () => {
    facebookIcon.src = "images/icon_facebook.svg";
  })

  twitterIcon.addEventListener("mouseenter", () => {
    twitterIcon.src = "images/icon-twitter-hover.svg";
  })

  twitterIcon.addEventListener("mouseout", () => {
    twitterIcon.src = "images/icon-twitter.svg";
  })

  instaIcon.addEventListener("mouseenter", () => {
    instaIcon.src = "images/icon_instagram-hover.svg";
  })

  instaIcon.addEventListener("mouseout", () => {
    instaIcon.src = "images/icon_instagram.svg";
  })
}

changesOnHover();



function addAndRemoveFavourites() { //ESTA ESTÁ SIN USAR
  const favIcons = document.querySelectorAll(".fav-icon");

  favIcons.forEach(icon => {
    icon.onclick = () => {
      const hasFavourites = localStorage.getItem("has-favourites");
      const iconWrapper = icon.parentElement; 
      const overlay = iconWrapper.parentElement;
      const gif = overlay.previousElementSibling;

      // if (gif.classList.contains("faved-gif")) { //esto saqué ahora para probar
      //   icon.src = "images/icon-fav.svg";
      // }else {
      //   icon.src = "images/icon-fav-active.svg";
      // }
      
      if (hasFavourites === "false") {
        startFavourites(icon);
      } 
      else {
        addOrRemoveFavourites(icon);
      }
    }
  })
}

function startFavourites(icon) {
  localStorage.setItem("has-favourites", true);
  const favedGifs = [];
  const iconWrapper = icon.parentElement;
  const overlay = iconWrapper.parentElement;
  const gif = overlay.previousElementSibling;
  favedGifs.push(gif.id);
  gif.classList.add("faved-gif");
  icon.src = "images/icon-fav-active.svg";
  localStorage.setItem("faved-gifs", JSON.stringify(favedGifs));
}

function addOrRemoveFavourites(icon) {
  const storedGifs = localStorage.getItem("faved-gifs");
  const storedGifsArray = JSON.parse(storedGifs);
  const iconWrapper = icon.parentElement;
  const overlay = iconWrapper.parentElement;
  const gif = overlay.previousElementSibling;
  const findIndex = storedGifsArray.findIndex(gifId => gifId === gif.id);
  
  if (findIndex === -1) { //NO ENCUENTRA ID, LO AGREGA A FAV
    storedGifsArray.push(gif.id);
    gif.classList.add("faved-gif");
    icon.src = "images/icon-fav-active.svg";
    localStorage.setItem("faved-gifs", JSON.stringify(storedGifsArray));
    console.log(storedGifsArray);
  }else { //ENCUENTRA EL ID, LO QUITA DE FAVORITOS
    storedGifsArray.splice(findIndex, 1);
    gif.classList.remove("faved-gif");
    icon.src = "images/icon-fav.svg";
    console.log(storedGifsArray);

    if (storedGifsArray.length === 0) {
      localStorage.setItem("has-favourites", false)
    }
    
    localStorage.setItem("faved-gifs", JSON.stringify(storedGifsArray));
  }
}

function addAndRemoveFavsMobile() {
  const favIcons = document.querySelectorAll(".fav-icon");

  favIcons.forEach(icon => {
    icon.addEventListener("click", () => {
      const hasFavourites = localStorage.getItem("has-favourites");
      const overlay = icon.parentElement;
      const maxedGif = overlay.previousElementSibling;

      // if (maxedGif.classList.contains("faved-gif")) {
      //   icon.src = "images/icon-fav.svg";
      //   maxedGif.classList.remove("faved-gif")
      // }else if (maxedGif.classList.contains("faved-gifs")){
      //   icon.src = "images/icon-fav.svg";
      // }else {
      //   icon.src = "images/icon-fav-active.svg";
      //   //maxedGif.classList.add("faved-gif");
      // }

      if (hasFavourites === "false") {
        startFavsMobile(icon);
      } 
      else {
        addOrRemoveFavsMobile(icon);
      }
    })
  })
}

function startFavsMobile(icon) {
  localStorage.setItem("has-favourites", true);
  const favedGifs = [];
  const overlay = icon.parentElement;
  const maxedGif = overlay.previousElementSibling;
  favedGifs.push(maxedGif.id);
  maxedGif.classList.add("faved-gif");
  icon.src = "images/icon-fav-active.svg";
  localStorage.setItem("faved-gifs", JSON.stringify(favedGifs));
}

function addOrRemoveFavsMobile(icon) {
  const storedGifs = localStorage.getItem("faved-gifs");
  const storedGifsArray = JSON.parse(storedGifs);
  const overlay = icon.parentElement;
  const maxedGif = overlay.previousElementSibling;
  const findIndex = storedGifsArray.findIndex(gifId => gifId === maxedGif.id);
  
  if (findIndex === -1) { //NO ENCUENTRA ID, LO AGREGA A FAV
    storedGifsArray.push(maxedGif.id);
    maxedGif.classList.add("faved-gif");
    icon.src = "images/icon-fav-active.svg";
    localStorage.setItem("faved-gifs", JSON.stringify(storedGifsArray));
    console.log(storedGifsArray);
  }else { //ENCUENTRA EL ID, LO QUITA DE FAVORITOS
    storedGifsArray.splice(findIndex, 1); 
    maxedGif.classList.remove("faved-gif")
    icon.src = "images/icon-fav.svg";
    console.log(storedGifsArray);

    if (storedGifsArray.length === 0) {
      localStorage.setItem("has-favourites", false)
    }
    localStorage.setItem("faved-gifs", JSON.stringify(storedGifsArray));
  }
}


function addAndRemoveFavsMaxedGifs() {
  const favIcons = document.querySelectorAll(".fav-icon");

  favIcons.forEach(icon => {
    icon.onclick = () => {
      const hasFavourites = localStorage.getItem("has-favourites");
      const overlay = icon.parentElement; //esto saqué ahora para probar
      const gif = overlay.previousElementSibling;

      if (gif.classList.contains("faved-gif")) {
        icon.src = "images/icon-fav.svg";
      }else {
        icon.src = "images/icon-fav-active.svg";
      }
      
      if (hasFavourites === "false") {
        startFavsMaxed(icon);
      } 
      else {
        addOrRemoveFavsMaxed(icon);
      }
    }
  })
}

function startFavsMaxed(icon) {
  localStorage.setItem("has-favourites", true);
  const favedGifs = [];
  const overlay = icon.parentElement; //esto saqué ahora para probar
  const gif = overlay.previousElementSibling;
  favedGifs.push(gif.id);
  gif.classList.add("faved-gif");
  localStorage.setItem("faved-gifs", JSON.stringify(favedGifs));
}

function addOrRemoveFavsMaxed(icon) {
  const storedGifs = localStorage.getItem("faved-gifs");
  const storedGifsArray = JSON.parse(storedGifs);
  const overlay = icon.parentElement; //esto saqué ahora para probar
  const gif = overlay.previousElementSibling;
  const findIndex = storedGifsArray.findIndex(gifId => gifId === gif.id);
  
  if (findIndex === -1) { //NO ENCUENTRA ID, LO AGREGA A FAV
    storedGifsArray.push(gif.id);
    gif.classList.add("faved-gif");
    localStorage.setItem("faved-gifs", JSON.stringify(storedGifsArray));
    console.log(storedGifsArray);
  }else { //ENCUENTRA EL ID, LO QUITA DE FAVORITOS
    storedGifsArray.splice(findIndex, 1);
    gif.classList.remove("faved-gif");
    console.log(storedGifsArray);

    if (storedGifsArray.length === 0) {
      localStorage.setItem("has-favourites", false)
    }
    
    localStorage.setItem("faved-gifs", JSON.stringify(storedGifsArray));
  }
}

