(() => {
  if (window.__sharedSiteScriptLoaded) return;

  const script = document.createElement("script");
  script.src = "script.js";
  document.head.appendChild(script);
})();
