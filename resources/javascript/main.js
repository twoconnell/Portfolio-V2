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
//  About section read more
// ------------------------------------------------------------------------

const hiddenSection = document.querySelectorAll(".about-me-hidden");
const readMore = document.querySelector(".about-show-more");

readMore.addEventListener("click", () => {
  hiddenSection.forEach((section) => {
    section.classList.toggle("hide");

    if (section.classList.contains("hide")) {
      readMore.innerHTML = "Show more";
    } else {
      readMore.innerHTML = "Show less";
    }
  });
});
