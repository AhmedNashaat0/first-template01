let backgroundRandomize;
let backgroundOption = true;

//the start of pushing the main color option to local storage
let colorOptions = localStorage.getItem("color-list");

if (colorOptions !== null) {
  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.getItem("color-list")
  );

  document.querySelectorAll(".colors-list li").forEach((e) => {
    e.classList.remove("active");

    if (e.dataset.color === colorOptions) {
      e.classList.add("active");
    }
  });
}
//the end of pushing the main color option to local storage

// background random img in local storage
let backgroundLocal = localStorage.getItem("back-local");

if (backgroundLocal !== null) {
  if (backgroundLocal === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }
  document.querySelectorAll(".options-box span").forEach((e) => {
    e.classList.remove("active");
  });
  if (backgroundLocal === "true") {
    document.querySelector(".yes").classList.add("active");
  } else {
    document.querySelector(".no").classList.add("active");
  }
}

// toggle on settings button (show && hide settings box)
document.querySelector(".toggle-settings .fa-gear").onclick = function () {
  this.classList.toggle("fa-spin");
  document.querySelector(".settings-box").classList.toggle("open");
};

// changing main color && set it in the local storage
let colorList = document.querySelectorAll(".colors-list li");

colorList.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    colorList.forEach((e) => {
      e.classList.remove("active");
    });

    localStorage.setItem("color-list", e.target.dataset.color);
    e.target.classList.add("active");
  });
});
// changing background image by option-box
let changingBackEl = document.querySelectorAll(
  ".settings-box .options-box span"
);

let yes = document.querySelector(".yes");
let no = document.querySelector(".no");

changingBackEl.forEach((e) => {
  e.addEventListener("click", (e) => {
    changingBackEl.forEach((e) => {
      e.classList.remove("active");
    });

    e.target.classList.add("active");

    if (e.target.dataset.back === "yes") {
      backgroundOption === true;
      // calling the setinterval
      randomize();
      // set in local storage
      localStorage.setItem("back-local", true);
    } else if (e.target.dataset.back === "no") {
      backgroundOption === false;
      // stop the random imgs
      clearInterval(backgroundRandomize);
      //setting the local storage
      localStorage.setItem("back-local", false);
    }
  });
});
// changing background image url
let landingBackground = document.querySelector(".landing-page");
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

function randomize() {
  if (backgroundOption === true) {
    backgroundRandomize = setInterval(() => {
      let randomNumb = Math.floor(Math.random() * imgsArray.length);
      landingBackground.style.backgroundImage =
        "url(imgs/" + imgsArray[randomNumb] + ")";
    }, 5000);
  }
}
randomize();
// gallery sec popup
let gallery = document.querySelector(".gallery");
let galleryPopUP = document.querySelectorAll(".gallery .images-sec img");
galleryPopUP.forEach((img) => {
  img.addEventListener("click", () => {
    let popUp = document.createElement("div");
    popUp.className = "popUp";
    let galleryPop = document.createElement("div");
    galleryPop.className = "galleryPop";
    let close = document.createElement("span");
    close.innerHTML = "X";
    galleryPop.prepend(close);
    let imgs = document.createElement("img");
    imgs.src = img.src;
    galleryPop.appendChild(imgs);
    popUp.appendChild(galleryPop);
    document.body.appendChild(popUp);
    close.onclick = function () {
      popUp.remove();
    };
  });
});
let allBullets = document.querySelectorAll(".nav-bullets .bullets");
allBullets.forEach((bullet) => {
  bullet.addEventListener("click", (e) => {
    e.currentTarget.style.backgroundColor = "var(--main-color)";
  });
});
// handel active function
let navbullets = document.querySelector(".nav-bullets");
let bulletsOption = document.querySelectorAll(
  ".settings-box .options-box .option-bullet p"
);
let bulletsLocalStorage = localStorage.getItem("bullets-storage");
if (bulletsLocalStorage !== null) {
  bulletsOption.forEach((ele) => {
    ele.classList.remove("view");
  });
  if (bulletsLocalStorage === "block") {
    navbullets.style.display = "block";
    document.querySelector(".option-bullet .show").classList.add("view");
  } else {
    navbullets.style.display = "none";
    document.querySelector(".option-bullet .hide").classList.add("view");
  }
}
bulletsOption.forEach((ele) => {
  ele.addEventListener("click", (e) => {
    if (e.target.dataset.display === "show") {
      navbullets.style.display = "block";
      localStorage.setItem("bullets-storage", "block");
    } else {
      navbullets.style.display = "none";
      localStorage.setItem("bullets-storage", "none");
    }
    bulletsOption.forEach((e) => {
      e.classList.remove("view");
    });
    e.target.classList.add("view");
  });
});
// reset btn
document.querySelector(".reset-button").onclick = function () {
  localStorage.clear();
  window.location.reload();
};
// menu bar
let menu = document.querySelector(".menu-button");
let navBar = document.querySelector(".nav-bar");
menu.onclick = function (e) {
  e.stopPropagation();
  menu.classList.toggle("menu-active");
  navBar.classList.toggle("open");
};
document.addEventListener("click", (e) => {
  if (e.target !== menu && e.target !== navBar) {
    if (navBar.classList.contains("open")) {
      menu.classList.toggle("menu-active");
      navBar.classList.toggle("open");
    }
  }
});
navBar.onclick = function (e) {
  e.stopPropagation();
};
