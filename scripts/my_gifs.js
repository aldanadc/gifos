const myGifsNoContent = document.getElementById("mis-gifos-no-content");
const myGifsContent = document.getElementById("mis-gifos-with-content");
const sectionLink = document.querySelector("#menu li:nth-of-type(3) a");
let myGifId;

sectionLink.style.color = "#9CAFC3";

const fetchMyGifs = async () => {
  const response = await fetch(`https://api.giphy.com/v1/gifs/${myGifId}?api_key=${APIkey}`);
  const data = await response.json();
  return data
}

if (window.matchMedia("(min-width: 1024px)").matches) {

  function showMyGifs() {
    const hasmyGifs = localStorage.getItem("has-my-gifs");
    const myStoredGifs = localStorage.getItem("my-gifs");
    const myStoredGifsArray = JSON.parse(myStoredGifs);
  
    if (hasmyGifs === "true") {
      myGifsNoContent.classList.add("hidden");
  
      for (let gifId of myStoredGifsArray) { 
        const gifContainer = document.createElement("section");
        const img = document.createElement("img");
        const gifOverlay = document.createElement("div");
        img.setAttribute("class", "my-gif");
        gifContainer.setAttribute("class", "gif-container");
        gifOverlay.setAttribute("class", "gif-overlay");
        myGifId = gifId;
  
        fetchMyGifs().then(data => {
          img.src = data.data.images.fixed_height.url;
          img.setAttribute("id", data.data.id)
          createGifInfo(gifOverlay, data.data);
        })
  
        gifContainer.appendChild(img);
        gifContainer.appendChild(gifOverlay);
        myGifsContent.appendChild(gifContainer);
  
        createMyGifIcons(gifOverlay);
  
        displayIconsOnHover(gifOverlay);
      }
  
      changeIconsOnHover();
  
      trashIconsOnHover();
  
      removeFromMyGifs();
  
      //maxGif();
  
    } else if (hasmyGifs === false) {
      myGifsNoContent.style.display = "block";
    }
  }  
}else {
  const hasmyGifs = localStorage.getItem("has-my-gifs");
    const myStoredGifs = localStorage.getItem("my-gifs");
    const myStoredGifsArray = JSON.parse(myStoredGifs);
  
    if (hasmyGifs === "true") {
      myGifsNoContent.classList.add("hidden");
  
      for (let gifId of myStoredGifsArray) { 
        const gifContainer = document.createElement("section");
        const img = document.createElement("img");
        const gifOverlay = document.createElement("div");
        img.setAttribute("class", "my-gif");
        img.setAttribute("class", "gif");
        gifContainer.setAttribute("class", "gif-container");
        gifOverlay.setAttribute("class", "gif-overlay");
        myGifId = gifId;
  
        fetchMyGifs().then(data => {
          img.src = data.data.images.fixed_height.url;
          img.setAttribute("id", data.data.id)
          createGifInfo(gifOverlay, data.data);
        })
  
        gifContainer.appendChild(img);
        gifContainer.appendChild(gifOverlay);
        myGifsContent.appendChild(gifContainer);
  
        //createMyGifIcons(gifOverlay);
  
        //displayIconsOnHover(gifOverlay);
      }
  
      //changeIconsOnHover();
  
      //trashIconsOnHover();
  
      removeFromMyGifs();
  }else if (hasmyGifs === false) {
    myGifsNoContent.style.display = "block";
  }
}

showMyGifs();


function createMyGifIcons(eachOverlayDiv) {
  //CREA UN SOLO GRUPO DE ÍCONOS POR CADA DIV
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
      console.log("hola");
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
        localStorage.setItem("my-gifs", JSON.stringify(myStoredGifsArray));
        console.log(myStoredGifsArray);
        console.log("hola");
      }
    })
  })
}



// function showMyGifs() {
//   const hasmyGifs = localStorage.getItem("has-my-gifs");
//   const myStoredGifs = localStorage.getItem("my-gifs");
//   const myStoredGifsArray = JSON.parse(myStoredGifs);

//   if (hasmyGifs === "true") {
//     myGifsNoContent.classList.add("hidden");

//     for (let gifId of myStoredGifsArray) { 
//       const gifContainer = document.createElement("section");
//       const img = document.createElement("img");
//       const gifOverlay = document.createElement("div");
//       img.setAttribute("class", "my-gif");
//       gifContainer.setAttribute("class", "gif-container");
//       gifOverlay.setAttribute("class", "gif-overlay");
//       myGifId = gifId;

//       fetchMyGifs().then(data => {
//         img.src = data.data.images.fixed_height.url;
//         img.setAttribute("id", data.data.id)
//         createGifInfo(gifOverlay, data.data);
//       })

//       gifContainer.appendChild(img);
//       gifContainer.appendChild(gifOverlay);
//       myGifsContent.appendChild(gifContainer);

//       createMyGifIcons(gifOverlay);

//       displayIconsOnHover(gifOverlay);
//     }

//     changeIconsOnHover();

//     trashIconsOnHover();

//     removeFromMyGifs();

//     //maxGif();

//   } else if (hasmyGifs === false) {
//     myGifsNoContent.style.display = "block";
//   }
// }