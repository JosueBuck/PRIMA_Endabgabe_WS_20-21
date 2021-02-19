"use strict";
var EndabgabePrototyp;
(function (EndabgabePrototyp) {
    var f = FudgeCore;
    window.addEventListener("load", hndLoad);
    async function hndLoad() {
        EndabgabePrototyp.canvas = document.querySelector("canvas");
        EndabgabePrototyp.root = new f.Node("Root");
        EndabgabePrototyp.sceneBuilder1 = EndabgabePrototyp.SceneBuilder.getInstance();
        EndabgabePrototyp.cmpCamera = new f.ComponentCamera();
        /* cmpCamera.pivot.translateZ(40 + canvas.width / 10); */
        EndabgabePrototyp.cmpCamera.pivot.translateZ(40);
        EndabgabePrototyp.cmpCamera.pivot.rotateY(180);
        EndabgabePrototyp.viewport = new f.Viewport();
        EndabgabePrototyp.viewport.initialize("Viewport", EndabgabePrototyp.root, EndabgabePrototyp.cmpCamera, EndabgabePrototyp.canvas);
        EndabgabePrototyp.crc2 = EndabgabePrototyp.canvas.getContext("2d");
        await EndabgabePrototyp.hndJson("../data/difficulty.json");
        EndabgabePrototyp.sceneBuilder1.readyCurrentLevel(EndabgabePrototyp.Level.MENU);
        EndabgabePrototyp.sceneBuilder1.playAudio("../sounds/gameMusic.mp3", 0.5, true);
        f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, hndLoop);
        f.Loop.start(f.LOOP_MODE.TIME_GAME, 60);
    }
    function hndLoop() {
        EndabgabePrototyp.viewport.draw();
        EndabgabePrototyp.sceneBuilder1.hndCurrentLvl();
        /* if(sceneBuilder1.levelStatus == Level.TWO)
            hotDogOne.constructCollisionRect();  */
        // posClient = hotDogOne.rect.position;
        // console.log(posClient);
    }
})(EndabgabePrototyp || (EndabgabePrototyp = {}));
//# sourceMappingURL=Main.js.map