function init() {
  const features = document.createElement("div");
  features.className = "topbar-features";
  features.id = "topbar-features";

  features.innerHTML =
    '<div class="theme-container"><button id="dropdown-button" class="dropdown-button"><span>Theme</span></button><ul class="dropdown-content" id="dropdown-content"><li id="dark">Dark</li><li id="light">Light</li><li id="palenight">Palenight</li><li id="solarized_light">Solarized Light</li><li id="night_owl">Night Owl</li></ul></div>';

  function createDropdown(device) {
    const currentTheme = localStorage.getItem("oh_theme") || SETTINGS.theme;
    setTheme({ id: currentTheme });
    const nav =
      device === "web"
        ? document.querySelector(".notion-topbar").firstChild
        : document.querySelector(".notion-topbar-mobile");
    nav.appendChild(features);

    const dropdownButton = document.getElementById("dropdown-button");
    const dropdownContent = document.getElementById("dropdown-content");

    dropdownButton.addEventListener("click", toggle);

    var items = Array.from(dropdownContent.children);
    items.forEach((item) => {
      item.addEventListener("click", toggle);
      item.addEventListener("click", () => setTheme(item));
    });
  }

  function toggle() {
    const dropdownContent = document.getElementById("dropdown-content");
    dropdownContent.classList.toggle("show");
  }

  function setTheme({ id }) {
    document.body.className = "notion-body " + id;
    document.body.dataset.theme = id;

    localStorage.setItem("oh_theme", id);
    switch (id) {
      case "dark":
        onDark();
        break;
      case "light":
        onLight();
        break;
      case "palenight":
        onDark();
        break;
      case "solarized_light":
        onLight();
        break;
      case "night_owl":
        onDark();
        break;
      default:
        onLight();
    }
  }

  function onDark() {
    __console.environment.ThemeStore.setState({ mode: "dark" });
  }

  function onLight() {
    __console.environment.ThemeStore.setState({ mode: "light" });
  }
}
