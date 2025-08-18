(function(){
  let deferredPrompt; 
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
  });
  window.ChopChopInstall = {
    prompt: async function(){
      if(!deferredPrompt) return;
      deferredPrompt.prompt();
      await deferredPrompt.userChoice; 
      deferredPrompt = null;
    }
  };
})();
