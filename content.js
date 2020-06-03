var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

//set messaging port (sender)
const port = chrome.runtime.connect({name: "Watch Your Profanity"});

//holder of subtitles
var current;

//callback func when mutation happens
const callback = () =>{

    if( $('.player-timedtext').text().length && $('.player-timedtext').text() !== current ){
        
        current = $('.player-timedtext').text(); //replace previous subtitle
    
        if( current.includes('fuck') ){
            
            //replace text
            $('.player-timedtext').children().each( function(){
                $(this).html( $(this).html().replace(/fuck/g,"f***") );
            });
            current = $('.player-timedtext').text(); //replace since text is changed

            port.postMessage({mute: true}); //mute

        } else if( current.includes('Fuck') ){

            //replace text
            $('.player-timedtext').children().each( function(){
                $(this).html( $(this).html().replace(/Fuck/g,"F***") );
            });
            current = $('.player-timedtext').text(); //replace since text is changed

            port.postMessage({mute: true}); //mute

        } else{
            port.postMessage({mute: false}); //unmute
        }
        // console.log(`SUBTITLES => ${$('.player-timedtext').text()}`);
    } 
    
    else if ( $('.player-timedtext').text().length == 0){ //if no words
        port.postMessage({mute: false}); //unmute
    }
}

if(MutationObserver){
    var observer = new MutationObserver(callback);

    chrome.storage.local.get('watchyourprofanity', data => {
        if(data.watchyourprofanity){
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        } else{
            observer.disconnect();
        }
    });
}