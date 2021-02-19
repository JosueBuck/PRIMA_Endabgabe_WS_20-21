"use strict";
var EndabgabePrototyp;
(function (EndabgabePrototyp) {
    window.addEventListener("load", hndLoad);
    function hndLoad() {
        let paragraph = document.getElementById("musicURL");
        console.log(paragraph.innerHTML);
        //playAudio("../sounds/mainMenuMusic.mp3", 0.8);
        playAudio(paragraph.innerHTML, 0.5);
    }
    function playAudio(_url, volume) {
        let audio = document.createElement("audio");
        audio.style.display = "none";
        audio.src = _url;
        audio.volume = volume;
        audio.autoplay = true;
        audio.onended = function () {
            playAudio(_url, 0.5);
        };
        document.body.appendChild(audio);
    }
})(EndabgabePrototyp || (EndabgabePrototyp = {}));
//# sourceMappingURL=index.js.map