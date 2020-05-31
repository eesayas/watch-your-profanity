//set messaging port (sender)
var port = chrome.runtime.connect({name: "Watch Your Profanity"});

//stores current text
var current;

//callback func when mutation happens
var callback = () =>{

    //get subtitle element according to Netflix html
    let subtitles = Array.from(document.getElementsByClassName('player-timedtext-text-container'));
    
    if(subtitles.length > 0){
        let text = [];
        subtitles.forEach((subtitle) => {
            text.push(subtitle.textContent);
        });

        if(text.join(' ').toLowerCase() !== current){
            current = text.join(' ').toLowerCase();

            if(current.includes('fuck')){
                console.log('Watch your profanity');
                port.postMessage({mute: true});
                

            } else if(!(current.includes('fuck'))){
                port.postMessage({mute: false});
            }
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