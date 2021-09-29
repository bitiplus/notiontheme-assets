console.log("🎁 Theme Dark");
localStorage.setItem("oh_theme", "dark");
__console.environment.ThemeStore.setState({ mode: "dark" });

element.append(
  `<script src='https://bitiplus.github.io/notiontheme-assets/features/theme/js/theme-${siteSettings.theme}.js' ></script>`,
  { html: true }
);
