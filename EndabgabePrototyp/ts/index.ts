namespace EndabgabePrototyp {   
    
    window.addEventListener("load", hndLoad);

    function hndLoad(): void {
        let paragraph: HTMLElement = <HTMLElement>document.getElementById("musicURL");
        console.log(paragraph.innerHTML);
        //playAudio("../sounds/mainMenuMusic.mp3", 0.8);
        playAudio(paragraph.innerHTML, 0.5); 
    }
  

    function playAudio(_url: string, volume: number): void {

        let audio: HTMLAudioElement = document.createElement("audio");
        audio.style.display = "none";    
        audio.src = _url; 
        audio.volume = volume;
        audio.autoplay = true;
        audio.onended = function(): void {
            playAudio(_url, 0.5);
        };
        document.body.appendChild(audio);
      }

}