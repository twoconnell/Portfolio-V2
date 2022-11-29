// ------------------------------------------------------------------------
//  Prevent scrolling
// ------------------------------------------------------------------------

var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event

var supportsPassive = false;
try {
  window.addEventListener(
    "test",
    null,
    Object.defineProperty({}, "passive", {
      get: function () {
        supportsPassive = true;
      },
    })
  );
} catch (e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent =
  "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

function disableScroll() {
  window.addEventListener("DOMMouseScroll", preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener("touchmove", preventDefault, wheelOpt); // mobile
  window.addEventListener("keydown", preventDefaultForScrollKeys, false);
}

function enableScroll() {
  window.removeEventListener("DOMMouseScroll", preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
  window.removeEventListener("touchmove", preventDefault, wheelOpt);
  window.removeEventListener("keydown", preventDefaultForScrollKeys, false);
}

disableScroll();

// ------------------------------------------------------------------------
//  Cookie popup
// ------------------------------------------------------------------------

const cookieBox = document.querySelector(".cookie-popup");
const cookieYes = document.querySelector(".cookie-button-yes");
const cookieNo = document.querySelector(".cookie-button-no");

cookieYes.addEventListener("click", () => {
  document.cookie = "CookieBy=twoconnell.com; max-age=" + 60 * 60 * 24 * 30; //Cookie set for 1 month
  cookieBox.classList.add("hide");
  enableScroll();
});

cookieNo.addEventListener("click", () => {
  cookieBox.classList.add("hide");
  enableScroll();
});

if (document.cookie) {
  cookieBox.classList.add("hide");
  enableScroll();
} else {
  cookieBox.classList.remove("hide");
}

// ------------------------------------------------------------------------
//  Locally store theme choice
// ------------------------------------------------------------------------

const colorThemes = document.querySelectorAll('[name="theme"]');

//store theme

const storeTheme = function (theme) {
  if (document.cookie) {
    //Checks for cookie before setting localStorage
    localStorage.setItem("theme", theme);
  }
};

const getTheme = function () {
  const activeTheme = localStorage.getItem("theme");
  colorThemes.forEach((themeOption) => {
    if (themeOption.id === activeTheme) {
      themeOption.checked = true;
    }
  });
};

colorThemes.forEach((themeOption) => {
  themeOption.addEventListener("click", () => {
    storeTheme(themeOption.id);
  });
});

document.onload = getTheme();

// ------------------------------------------------------------------------
//  Mobile / Tablet / desktop conditional
// ------------------------------------------------------------------------

var screenSize = document.documentElement.clientWidth || window.innerWidth;

// ------------------------------------------------------------------------
//  About section read more
// ------------------------------------------------------------------------

// variables
const aboutGrid = document.querySelector(".grid-container--about");

const card1Title = document.querySelector(".card-1--title");
const card1Content = document.querySelector(".card-1--content");
const card1Image = document.querySelector(".card-1--image");
const card2Content = document.querySelector(".card-2--content");
const card2Footer = document.querySelector(".card-2--footer");

const showMoreButton = document.querySelector(".show-more-button");

// Set initial arrow direction depending on device
window.addEventListener("DOMContentLoaded", () => {
  if (screenSize < 928) {
    showMoreButton.classList.add("show-more-button--rotate-mobile");
  } else {
    showMoreButton.classList.add("show-more-button--rotate-desktop");
  }
});



showMoreButton.addEventListener("click", () => {
  if (screenSize < 928) {
    if (showMoreButton.classList.contains("show-more-button--rotate-mobile")) {
      showMoreButton.classList.remove("show-more-button--rotate-mobile");
      card2Footer.classList.remove("ff-flower", "fs-500", "center");
      // Add all my extra about me bits here!
    } else {
      showMoreButton.classList.add("show-more-button--rotate-mobile");
      card2Footer.classList.add("ff-flower", "fs-500", "center");
      // remove my extra about me bits here and return to footer text
    }
  } else {
    if (showMoreButton.classList.contains("show-more-button--rotate-desktop")) {
      // Change the button orientation
      showMoreButton.classList.remove("show-more-button--rotate-desktop");
      showMoreButton.classList.add("show-more-button--rotate-desktop-back");

      // Change the grid areas
      aboutGrid.style.gridTemplateAreas = '"show-more-button card-1 card-2 ."';

    } else {
      // Change the button orientation
      showMoreButton.classList.add("show-more-button--rotate-desktop");
      showMoreButton.classList.remove("show-more-button--rotate-desktop-back");

      // Change the grid areas
      aboutGrid.style.gridTemplateAreas = '". card-1 card-2 show-more-button"';

    }


  }
})

