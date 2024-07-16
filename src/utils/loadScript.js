// src/utils/loadScript.js
const loadScript = (src, id) => {
    return new Promise((resolve, reject) => {
      let script = document.getElementById(id);
  
      if (script) {
        if (script.getAttribute('data-loaded') === 'true') {
          resolve(script);
        } else {
          script.onload = () => {
            script.setAttribute('data-loaded', 'true');
            resolve(script);
          };
          script.onerror = (error) => {
            reject(error);
          };
        }
        return;
      }
  
      script = document.createElement('script');
      script.src = src;
      script.id = id;
      script.onload = () => {
        script.setAttribute('data-loaded', 'true');
        resolve(script);
      };
      script.onerror = (error) => {
        reject(error);
      };
      document.body.appendChild(script);
    });
  };
  
  const pollForDesmos = (resolve, reject, attempts = 0) => {
    if (window.Desmos) {
      resolve(window.Desmos);
    } else if (attempts < 10) {
      setTimeout(() => pollForDesmos(resolve, reject, attempts + 1), 300);
    } else {
      reject(new Error('Desmos object not found'));
    }
  };
  
  const loadDesmosScript = (src, id) => {
    return loadScript(src, id).then(() => {
      return new Promise((resolve, reject) => {
        pollForDesmos(resolve, reject);
      });
    });
  };
  
  export default loadDesmosScript;
  