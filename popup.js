var checkbox = Array.from(document.getElementsByTagName('input'))[0];
var label = Array.from(document.getElementsByTagName('label'))[0];
var sfx = new Audio(chrome.extension.getURL('enabled_sfx.mp3'));
// const port = chrome.runtime.connect({name: "Watch Your Profanity"});

//determine prev local storage values for enabled/disabled
chrome.storage.local.get('watchyourprofanity', data => {
   if(data.watchyourprofanity == true){
        label.textContent = 'Enabled';
        chrome.storage.local.set({'watchyourprofanity': true});
        checkbox.checked = true;
        
    } else{
        label.textContent = 'Disabled';
        chrome.storage.local.set({'watchyourprofanity': false});
        checkbox.checked = false;
    } 
});

checkbox.addEventListener('change', (event) => {
    if(event.target.checked){
        label.textContent = 'Enabled';
        chrome.storage.local.set({'watchyourprofanity': true});
        checkbox.checked = true;
        sfx.play(); //play sound effects for the lolz

    } else{
        label.textContent = 'Disabled';
        chrome.storage.local.set({'watchyourprofanity': false});
        checkbox.checked = false;
    }

    // port.postMessage({refresh: true}); //reload current tab
});

