function startLocalStorage() {
  const darkMode = localStorage.getItem("dark-mode-active");

  if (darkMode === null) {
    localStorage.setItem("dark-mode-active", false);
  }

  const storedGifs = localStorage.getItem("faved-gifs");
  
  if (storedGifs === null){
    localStorage.setItem("has-favourites", false);
  }

  const myGifs = localStorage.getItem("has-my-gifs");

  if (myGifs === null) {
    localStorage.setItem("has-my-gifs", false);
  }
}


startLocalStorage();