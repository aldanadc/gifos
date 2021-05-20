const createGifBtn = document.querySelector("#btn-start");
const recordBtn = document.querySelector("#btn-record");
const stopRecordingBtn = document.querySelector("#btn-stop");
const uploadBtn = document.querySelector("#btn-upload");
const createAnotherBtn = document.querySelector("#btn-create-another");
const panelTitle = document.querySelector("#panel .title");
const panel = document.querySelector("#panel");
const firstP = document.querySelector("#first-p");
const secondP = document.querySelector("#second-p");
const stepOne = document.querySelector("#paso-a-paso span:first-of-type");
const stepTwo = document.querySelector("#paso-a-paso span:nth-of-type(2)");
const stepThree = document.querySelector("#paso-a-paso span:nth-of-type(3)");
const thirdCorner = document.querySelector(".corner-3");
const fourthCorner = document.querySelector(".corner-4");
const cameraStream = document.querySelector(".cam-stream");
const timerAndRepeat = document.querySelector("#duration-repeat");
const gifIcons = document.querySelector(".icons-wrapper");
const createdGifOverlay = document.querySelector(".created-gif-overlay");
const mobileView = document.querySelector("#content-mobile");
const desktopView = document.querySelector("main");
const cameraConditions = { audio: false, video: { height: { max: 300 }, width: { max: 600 } } };
const APIkey = "xuMDkSg7dnKR2qernbZ0b58a42n5X2Bn";
const uploadUrl = `https://upload.giphy.com/v1/gifs?api_key=${APIkey}`;
const createdGifImg = document.querySelector(".created-gif");
let form = new FormData();
let recorder;
let myGifId;


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
  mobileView.style.display = "none";
  menu.style.marginLeft = "35%";
  createGifBtn.addEventListener("click", () => {
    panelTitle.innerHTML = "¿Nos das acceso <br> a tu cámara?";
    firstP.innerHTML = "El acceso a tu camara será válido sólo";
    secondP.innerHTML = "por el tiempo en el que estés creando el GIFO.";
    stepOne.classList.add("active");
    createGifBtn.classList.add("hidden");
    //createGifBtn.style.visibility = "hidden";
    requestCameraAccess();
  })


  async function requestCameraAccess() {
    await navigator.mediaDevices.getUserMedia(cameraConditions)

      .then(function sucessCallback(stream) {
        cameraStream.classList.remove("hidden");
        panelTitle.classList.add("hidden");
        firstP.classList.add("hidden");
        secondP.classList.add("hidden");
        cameraStream.srcObject = stream;
        cameraStream.play();

        recordBtn.classList.remove("hidden");
        //recordBtn.createGifBtn.style.visibility = "visible";
        stepOne.classList.remove("active");
        stepTwo.classList.add("active");
        thirdCorner.style.top = "-3px";
        fourthCorner.style.top = "-3px";
      })

    .catch(function errorCallback() {
        alert("Algo falló al intentar acceder a tu cámara, por favor recarga la página para intentar de nuevo");
    })
  }

  recordBtn.addEventListener("click", () => {
    record(cameraStream.srcObject);
  })


// function start(stream) {
//   record(stream)
// }

  function record(stream) {
    recorder = RecordRTC(stream,
      {
        type: 'gif',
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240,
        onGifRecordingStarted: function () {
          recordBtn.classList.add("hidden");
          //recordBtn.createGifBtn.style.visibility = "hidden";
          stopRecordingBtn.classList.remove("hidden");
          //stopRecordingBtn.createGifBtn.style.visibility = "visible";
        },
      });
    console.log(recorder);
    recorder.startRecording();

    showTimer();
  }

  stopRecordingBtn.addEventListener("click", () => {
    onStopRecording();
    cameraStream.srcObject.stop();
  })


  function onStopRecording() {
      recorder.stopRecording(function () {
        let createdGif = recorder.getBlob();
        form.append("file", createdGif, "newGif.gif");
        console.log(form.get('file'));
        hideVideoAndShowGif(createdGif);
        changeButtonsOnStop();
    });
    recorder = null;
  }

  hideVideoAndShowGif = (createdGif) => {
    cameraStream.classList.add("hidden");
    createdGifImg.classList.remove("hidden");
    createdGifImg.src = URL.createObjectURL(createdGif);
    const overlay = document.createElement("div");
    overlay.classList.add("created-gif-overlay");
    overlay.classList.add("hidden");
    panel.appendChild(overlay);
  }

  changeButtonsOnStop = () => {
    stopRecordingBtn.classList.add("hidden");
    //stopRecordingBtn.createGifBtn.style.visibility = "hidden";
    uploadBtn.classList.remove("hidden");
    //uploadBtn.createGifBtn.style.visibility = "visible";
    timerAndRepeat.innerHTML = "repetir captura".toUpperCase();
    timerAndRepeat.classList.add("repeatBtn");
    timerAndRepeat.addEventListener("click", () => {
      repeatRecording();
    })
  }

  function repeatRecording() {
    cameraStream.classList.remove("hidden");
    createdGifImg.classList.add("hidden");
    uploadBtn.classList.add("hidden");
    //uploadBtn.createGifBtn.style.visibility = "hidden";
    requestCameraAccess();
  }

  const overlayContent = document.querySelector(".overlay-content");
  const overlayImg = overlayContent.children[1];
  const overlayP = overlayContent.children[2];

  const uploadGif = async () => {
    createdGifOverlay.classList.remove("hidden");
    stepTwo.classList.remove("active");
    stepThree.classList.add("active");
    timerAndRepeat.classList.add("hidden");
    uploadBtn.classList.add("hidden");
    //uploadBtn.createGifBtn.style.visibility = "hidden";

    const response = await fetch(uploadUrl, {
      method: "POST",
      body: form
    })
    const data = await response.json();
    console.log(data)
    myGifId = data.data.id;
    addToMyGifs(myGifId);
    console.log(myGifId);
    
    setTimeout(() => {
      overlayImg.src = "/images/ok.svg";
      overlayP.textContent = "GIFO subido con éxito";
      gifIcons.style.visibility = "visible";
    }, 1500);
  };


  uploadBtn.addEventListener("click", uploadGif);


// override "stop" method for all browsers
  MediaStream.prototype.__stop = MediaStream.prototype.stop;
  MediaStream.prototype.stop = function() {
      this.getVideoTracks().forEach(function(track) {
          if (!!track.stop) {
              //console.log(track);
              track.stop();
          }
      });

      if (typeof this.__stop === 'function') {
          // also calling the native "stop" method
          this.__stop();
      }
  };



  function showTimer() {
    let timeStarted = new Date().getTime();
    timerAndRepeat.classList.remove("hidden");

    (function timerLooper() {
      if (!recorder) {
        return;
      }
      timerAndRepeat.innerHTML = calculateGifDuration(((new Date().getTime()) - timeStarted) / 1000);
      setTimeout(timerLooper, 1000);
    })();
  }

  function calculateGifDuration(secs) {
    let hr = Math.floor(secs / 3600);
    let min = Math.floor((secs - (hr * 3600)) / 60);
    let sec = Math.floor(secs - (hr * 3600) - (min * 60));

    if (sec < 10) {
      sec = "0" + sec;
    }
    if (min < 10) {
      min = "0" + min;
    }
    if (hr <= 0) {
      return "00:" + min + ":" + sec;
    }
    return hr + ":" + min + ":" + sec;
  }


  async function downloadCreatedGif() {
    const blob = await fetch(createdGifImg.src)
      .then(gif => gif.blob());
      invokeSaveAsDialog(blob, `tuGif.gif`);
  }

  //ASIGNAR FUNCIONES A ÍCONOS
  const downloadIcon = gifIcons.children[0];

  downloadIcon.addEventListener("click", () => {
    downloadCreatedGif();
  })

  const getLinkIcon = gifIcons.children[1];

  getLinkIcon.addEventListener("click", () => {
    getCreatedGifLink();
  })


  //HOVER EN ÍCONOS
  downloadIcon.addEventListener("mouseenter", () => {
    downloadIcon.src = "images/icon-download-hover.svg";
  })

  downloadIcon.addEventListener("mouseout", () => {
    downloadIcon.src = "images/icon-download.svg";
  })

  getLinkIcon.addEventListener("mouseenter", () => {
    getLinkIcon.src = "images/icon-link-hover.svg";
  })

  getLinkIcon.addEventListener("mouseout", () => {
    getLinkIcon.src = "images/icon-link-normal.svg";
  })


  function getCreatedGifLink() {
    console.log(`https://giphy.com/gifs/${myGifId}`);
    const copy = document.createElement("input");
    copy.setAttribute("value", `https://giphy.com/gifs/${myGifId}`);
    document.body.appendChild(copy);
    copy.select();
    document.execCommand("copy");
    document.body.removeChild(copy);
    alert("Link copiado")
  }


  function addToMyGifs(id) {
    const hasMyGifs = localStorage.getItem("has-my-gifs");
    
    if (hasMyGifs === "false") {
      localStorage.setItem("has-my-gifs", true);
      const myGifs = [];
      myGifs.push(id)
      console.log(myGifs);

      localStorage.setItem("my-gifs", JSON.stringify(myGifs));
    } 
    else {
      const myStoredGifs = localStorage.getItem("my-gifs");
      const myStoredGifsArray = JSON.parse(myStoredGifs);
      myStoredGifsArray.push(id);

      localStorage.setItem("my-gifs", JSON.stringify(myStoredGifsArray));
      console.log(myStoredGifsArray);
    }
  }

  function mediaIconsOnHover() {
    const facebookIcon = document.getElementById("fb-icon");
    const twitterIcon = document.getElementById("twitter-icon");
    const instaIcon = document.getElementById("insta-icon");

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

  mediaIconsOnHover();

}
else {
  mobileView.style.display = "block";
  desktopView.style.display = "none";
  //burger.style.display = "none";
}
// function changeIconsOnHover() {
//   const iconDownload = document.querySelectorAll(".fav-icon");
//   const iconDownload = document.querySelectorAll(".fav-icon");

//   iconsFav.forEach(icon => {
//     icon.addEventListener("mouseenter", () => {
//       icon.src = "images/icon-fav-hover.svg";
//     })

//     icon.addEventListener("mouseout", () => {
//       icon.src = "images/icon-fav.svg";
//     })
//   })
// }








