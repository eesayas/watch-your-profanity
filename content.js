//set messaging port (sender)
var port = chrome.runtime.connect({name: "Watch Your Profanity"});

//stores current text
var current;

//callback func when mutation happens
var callback = () =>{

    //get subtitle element according to Netflix html
    let subtitles = Array.from(document.getElementsByClassName('player-timedtext-text-container'));
    
    if(subtitles.length > 0){
        subtitles.forEach((subtitle) => {

            //replace f-words and send mute message to background.js
            if(subtitle.textContent.includes('fuck')){
                let oldText = subtitle.textContent;
                let newText = oldText.replace('fuck', 'f***');
                subtitle.childNodes[0].textContent = newText;
                port.postMessage({mute: true});
            
            } else if(subtitle.textContent.includes('Fuck')){
                let oldText = subtitle.textContent;
                let newText = oldText.replace('Fuck', 'F***');
                subtitle.childNodes[0].textContent = newText;
                port.postMessage({mute: true});
            }
            
        });

        //check if no f-words
        let fullText = [];

        fullText = subtitles.map(x => {
            return x.textContent
        });

        fullText = fullText.join(' ').toLowerCase();

        if(!(fullText.includes('fuck') || fullText.includes('f***'))){
            port.postMessage({mute: false});
        }
    
    } else{
        port.postMessage({mute: false});
    }

}

//init MutationObserver
var observer = new MutationObserver(callback);

//set what type of mutation to observe
const config = {
    childList: true, 
    subtree: true, 
    attributes: false, 
    characterData: false
};

//start observing
observer.observe(document.body, config);