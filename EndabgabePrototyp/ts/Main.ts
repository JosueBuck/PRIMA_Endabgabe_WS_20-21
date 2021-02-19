namespace EndabgabePrototyp {
    import f = FudgeCore;

    
    
    
    window.addEventListener("load", hndLoad);
    export let viewport: f.Viewport;
    export let canvas: HTMLCanvasElement;
    export let root: f.Node;
    export let sceneBuilder1: SceneBuilder;
    export let crc2: CanvasRenderingContext2D;
    export let cmpCamera: f.ComponentCamera;


    async function hndLoad(): Promise<void> {
        canvas = document.querySelector("canvas");
        root = new f.Node("Root");
        sceneBuilder1 = SceneBuilder.getInstance();
        cmpCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(40);
        cmpCamera.pivot.rotateY(180);

        viewport = new f.Viewport();
        viewport.initialize("Viewport", root, cmpCamera, canvas); 
        crc2 = canvas.getContext("2d");

        await hndJson("../data/difficulty.json");

        sceneBuilder1.readyCurrentLevel(Level.MENU); 
        sceneBuilder1.gameState = GAMESTATE.PLAY;

        f.Loop.addEventListener(f.EVENT.LOOP_FRAME, hndLoop);
        f.Loop.start(f.LOOP_MODE.TIME_GAME, 60);
    }


    function hndLoop(): void {
        if (sceneBuilder1.gameState == GAMESTATE.PAUSE) {
            viewport.draw();
            return;
        }
            
        
            
        viewport.draw();
        sceneBuilder1.hndCurrentLvl();
        

        
    }
}