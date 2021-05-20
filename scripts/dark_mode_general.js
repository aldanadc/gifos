const body = document.getElementsByTagName("body");
const logo = document.querySelector("#logo");
const topBottomLine = document.querySelectorAll(".purple-line");
const darkModeButton = document.querySelector("#btn-dark-mode");


function setMode() {
  const darkMode = localStorage.getItem("dark-mode-active");

  if (darkMode === "true") {
    body[0].classList.add("dark-mode");
    darkModeButton.innerHTML = "Modo Diurno";
    logo.src = "images/Logo-modo-noc.svg";
    createBtn.src = "images/CTA-crear-gifo-modo-noc.svg";
    burger.src = "images/burger-modo-noct.svg";
    topBottomLine[0].style.backgroundColor = "#000";
    topBottomLine[1].style.backgroundColor = "#000";
    sliderRight.src = "images/button-slider-right-md-noct.svg";
    sliderLeft.src = "images/button-slider-left-md-noct.svg";

    if (window.matchMedia("(max-width: 1023px)").matches) {
      const menu = document.getElementById("menu");
      menu.classList.remove("show-menu");
    }

    iconsHoverDarkMode();

  } else {
    body[0].classList.remove("dark-mode");
    darkModeButton.innerHTML = "Modo Nocturno";
    logo.src = "images/logo-mobile.svg";
    burger.src = "images/burger.svg";
    createBtn.src = "images/button-crear-gifo.svg";
    topBottomLine[0].style.backgroundColor = "#572EE5";
    topBottomLine[1].style.backgroundColor = "#572EE5";
    sliderRight.src = "images/Button-Slider-right.svg";
    sliderLeft.src = "images/button-slider-left.svg";

    if (window.matchMedia("(max-width: 1023px)").matches) {
      const menu = document.getElementById("menu");
      menu.classList.remove("show-menu");
    }

    iconsHoverDayMode();
  }
}

setMode();

// function startLocalStorage() {
//   const darkMode = localStorage.getItem("dark-mode-active");

//   if (darkMode === null) {
//     localStorage.setItem("dark-mode-active", false);
//   }

//   const storedGifs = localStorage.getItem("faved-gifs");
  
//   if (storedGifs === null){
//     localStorage.setItem("has-favourites", false);
//   }

//   const myGifs = localStorage.getItem("has-my-gifs");

//   if (myGifs === null) {
//     localStorage.setItem("has-my-gifs", false);
//   }
// }


// startLocalStorage();


darkModeButton.addEventListener("click", () => {

  const darkMode = localStorage.getItem("dark-mode-active");

  if (darkMode === "false") {
    localStorage.setItem("dark-mode-active", true);

  } else {
    localStorage.setItem("dark-mode-active", false);

  }

  setMode();
})


function iconsHoverDayMode() {

  createBtn.addEventListener("mouseenter", () => {
    createBtn.src = "images/CTA-crear-gifo-hover.svg";
  });

  createBtn.addEventListener("mouseout", () => {
    createBtn.src = "images/button-crear-gifo.svg";
  });

  sliderLeft.addEventListener("mouseenter", () => {
    sliderLeft.src = "images/button-slider-left-hover.svg";
  });

  sliderLeft.addEventListener("mouseout", () => {
    sliderLeft.src = "images/button-slider-left.svg";
  });

  sliderRight.addEventListener("mouseenter", () => {
    sliderRight.src = "images/Button-Slider-right-hover.svg";
  });

  sliderRight.addEventListener("mouseout", () => {
    sliderRight.src = "images/Button-Slider-right.svg";
  });

  facebookIcon.addEventListener("mouseenter", () => {
    facebookIcon.setAttribute("src", "images/icon_facebook_hover.svg");
  })

  facebookIcon.addEventListener("mouseout", () => {
    facebookIcon.setAttribute("src", "images/icon_facebook.svg");
  })

  twitterIcon.addEventListener("mouseenter", () => {
    twitterIcon.setAttribute("src", "images/icon-twitter-hover.svg");
  })

  twitterIcon.addEventListener("mouseout", () => {
    twitterIcon.setAttribute("src", "images/icon-twitter.svg");
  })

  instaIcon.addEventListener("mouseenter", () => {
    instaIcon.setAttribute("src", "images/icon_instagram-hover.svg");
  })

  instaIcon.addEventListener("mouseout", () => {
    instaIcon.setAttribute("src", "images/icon_instagram.svg");
  })
}

function iconsHoverDarkMode() {

  createBtn.addEventListener("mouseenter", () => {
    createBtn.src = "images/CTA-crear-gifo-hover-modo-noc.svg";
  });

  createBtn.addEventListener("mouseout", () => {
    createBtn.src = "images/CTA-crear-gifo-modo-noc.svg";
  });

  sliderLeft.addEventListener("mouseenter", () => {
    sliderLeft.src = "images/button-slider-left-hover.svg";
  });

  sliderLeft.addEventListener("mouseout", () => {
    sliderLeft.src = "images/button-slider-left-md-noct.svg";
  });

  sliderRight.addEventListener("mouseenter", () => {
    sliderRight.src = "images/Button-Slider-right-hover.svg";
  });

  sliderRight.addEventListener("mouseout", () => {
    sliderRight.src = "images/button-slider-right-md-noct.svg";
  });

  facebookIcon.addEventListener("mouseenter", () => {
    facebookIcon.setAttribute("src", "images/icon_facebook_noc.svg");
  })

  facebookIcon.addEventListener("mouseout", () => {
    facebookIcon.setAttribute("src", "images/icon_facebook.svg");
  })

  twitterIcon.addEventListener("mouseenter", () => {
    twitterIcon.setAttribute("src", "images/icon_twitter_noc.svg");
  })

  twitterIcon.addEventListener("mouseout", () => {
    twitterIcon.setAttribute("src", "images/icon-twitter.svg");
  })

  instaIcon.addEventListener("mouseenter", () => {
    instaIcon.setAttribute("src", "images/icon_instagram_noc.svg");
  })

  instaIcon.addEventListener("mouseout", () => {
    instaIcon.setAttribute("src", "images/icon_instagram.svg");
  })
}