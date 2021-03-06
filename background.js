//this aux function mutes/unmutes a tab with a specific url
const toggleMute = (bool) => {
    chrome.tabs.query({url: []}, function (tabs) {
        for (var i = 0; i < tabs.length; i++) {
            if(tabs[i].active){
                var mutedInfo = tabs[i].mutedInfo;
                if (mutedInfo) chrome.tabs.update(tabs[i].id, {"muted": bool});
            }
        }
    });
}

// //reload chrome tabs to apply changes
// const reloadTab = () =>{
//     chrome.tabs.query({url: []}, function(tabs) {
//         for (var i = 0; i < tabs.length; i++) {
//             chrome.tabs.update(tabs[i].id, {url: tabs[i].url});
//         }
//     });
// }

//set port listener (receiver)
chrome.runtime.onConnect.addListener((port) => {
    console.assert(port.name == "Watch Your Profanity");
    port.onMessage.addListener(function(msg){
        toggleMute(msg.mute);
    });
});
