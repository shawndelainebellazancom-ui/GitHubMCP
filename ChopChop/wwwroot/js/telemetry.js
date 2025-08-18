(function(){
  const key = 'cc-telemetry';
  function send(event, data){
    const payload = { ts: Date.now(), event, data };
    try{
      const arr = JSON.parse(localStorage.getItem(key) || '[]');
      arr.push(payload); localStorage.setItem(key, JSON.stringify(arr));
      // Hook: send to backend later
    }catch{}
  }
  window.CCTel = { send };
  send('boot', { ua: navigator.userAgent });
})();
