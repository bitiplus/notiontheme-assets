const observer = new MutationObserver(function () {
  function getPage() {
    return location.pathname.slice(-32);
  }
  function getSlug() {
    return location.pathname.slice(1);
  }

  function updateSlug() {
    const slug = PAGE_TO_SLUG[getPage()];
    if (slug != null) {
      history.replaceState(history.state, "", "/" + slug);
    }
  }

  if (redirected) return;
  const nav = document.querySelector(".notion-topbar");
  const mobileNav = document.querySelector(".notion-topbar-mobile");
  if (
    (nav && nav.firstChild && nav.firstChild.firstChild) ||
    (mobileNav && mobileNav.firstChild)
  ) {
    redirected = true;
    updateSlug();
    createDropdown(nav ? "web" : "mobile");
    const onpopstate = window.onpopstate;
    window.onpopstate = function () {
      if (slugs.includes(getSlug())) {
        const page = SLUG_TO_PAGE[getSlug()];
        if (page) {
          console.log("replaceState: page", page);
          history.replaceState(history.state, "bypass", "/" + page);
        }
      }
      onpopstate.apply(this, [].slice.call(arguments));
      updateSlug();
    };
  }
});

observer.observe(document.querySelector("#notion-app"), {
  childList: true,
  subtree: true,
});

const replaceState = window.history.replaceState;
window.history.replaceState = function (state) {
  if (arguments[1] !== "bypass" && slugs.includes(getSlug())) return;
  return replaceState.apply(window.history, arguments);
};

const pushState = window.history.pushState;
window.history.pushState = function (state) {
  const dest = new URL(location.protocol + location.host + arguments[2]);
  const id = dest.pathname.slice(-32);
  if (pages.includes(id)) {
    arguments[2] = "/" + PAGE_TO_SLUG[id];
  }
  return pushState.apply(window.history, arguments);
};

const open = window.XMLHttpRequest.prototype.open;
window.XMLHttpRequest.prototype.open = function () {
  arguments[1] = arguments[1].replace(SETTINGS.DOMAIN, "www.notion.so");
  return open.apply(this, [].slice.call(arguments));
};
