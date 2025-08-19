(function(){
  let deferredPrompt;
  let available = false;

  function updateAvailability(val){
    available = !!val;
  }

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    updateAvailability(true);
  });

  window.addEventListener('appinstalled', () => {
    deferredPrompt = null;
    updateAvailability(false);
  });

  window.ChopChopInstall = {
    prompt: async function(){
      if(!deferredPrompt) return;
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      deferredPrompt = null;
      updateAvailability(false);
    },
    available: function(){ return available; }
  };
})();
