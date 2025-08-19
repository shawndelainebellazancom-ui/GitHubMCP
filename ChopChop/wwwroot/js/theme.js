(function(){
  const storageKey = 'cc-theme';
  const themeLinkId = 'kendoTheme';
  const lightHref = '_content/Telerik.UI.for.Blazor/css/kendo-theme-fluent/all.css';
  const darkHref  = '_content/Telerik.UI.for.Blazor/css/kendo-theme-fluent-dark/all.css';

  function swapKendoCss(theme){
    var link = document.getElementById(themeLinkId);
    if(!link || link.tagName !== 'LINK') return;
    var desired = theme === 'dark' ? darkHref : lightHref;
    if (link.getAttribute('href') !== desired) {
      link.setAttribute('href', desired);
    }
  }

  function apply(theme){
    document.documentElement.setAttribute('data-theme', theme);
    swapKendoCss(theme);
    try{ localStorage.setItem(storageKey, theme); }catch{}
  }
  function init(){
    let t = 'light';
    try{ t = localStorage.getItem(storageKey) || t; }catch{}
    apply(t);
  }
  function toggle(){
    const cur = document.documentElement.getAttribute('data-theme') || 'light';
    apply(cur === 'dark' ? 'light' : 'dark');
  }
  // Defer init to ensure <link id="kendoTheme"> is in DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  window.ChopTheme = { toggle };
})();
