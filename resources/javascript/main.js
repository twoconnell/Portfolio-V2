// ------------------------------------------------------------------------
//  Locally store theme choice
// ------------------------------------------------------------------------

const colorThemes = document.querySelectorAll('[name="theme"]');

//store theme

const storeTheme = function (theme) {
  localStorage.setItem("theme", theme);
};

// for no :has support


const getTheme = function () {
  const activeTheme = localStorage.getItem("theme");
  colorThemes.forEach((themeOption) => {
    if (themeOption.id === activeTheme) {
      themeOption.checked = true;
    }
  });
  // for no :has support
  document.documentElement.className = theme;
};

colorThemes.forEach((themeOption) => {
  themeOption.addEventListener("click", () => {
    storeTheme(themeOption.id);
  });
});

document.onload = getTheme();
