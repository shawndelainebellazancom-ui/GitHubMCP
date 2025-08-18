(function(){
  const storageKey = 'cc-theme';
  function apply(theme){
    document.documentElement.setAttribute('data-theme', theme);
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
  init();
  window.ChopTheme = { toggle };
})();
