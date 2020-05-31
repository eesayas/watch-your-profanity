var callbackText = () =>{

    //get subtitle element according to Netflix html
    let subtitles = Array.from(document.getElementsByClassName('player-timedtext-text-container'));

    if(subtitles.length > 0){
        subtitles.forEach((subtitle) => {
            if(subtitle.textContent.includes('fuck')){
                let oldText = subtitle.textContent;
                let newText = oldText.replace('fuck', 'f***');
                subtitle.textContent = newText;
            
            } else if(subtitle.textContent.includes('Fuck')){
                let oldText = subtitle.textContent;
                let newText = oldText.replace('Fuck', 'F***');
                subtitle.textContent = newText;
            }
        });
    }
}

//init MutationObserver
var textObserver = new MutationObserver(callbackText);

//set what type of mutation to observe
const configText = {
    childList: true, 
    subtree: true, 
    attributes: false, 
    characterData: false
};

//start observing
observer.observe(document.body, configText);