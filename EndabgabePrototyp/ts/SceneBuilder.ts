namespace EndabgabePrototyp {
    import f = FudgeCore;
    import faid = FudgeAid;
    
    export enum Level {
        MENU,
        ONE,
        TWO,
        THREE,
        GAMEOVER,
        GOAL,
        NEXTLEVEL
    }

    export enum Difficulty {
        virgin,
        normal,
        sausageLover
    }

    export enum GAMESTATE {
        PLAY, PAUSE
    }

    

    export let sausageShooterOne: SausageShooter9000;
    export let hotDogBunOne: HotDogBun;
    export let hotDogOne: HotDog;
    export let pickleJarOne: PickleJar;
    export let hotDogWithSauceOne: HotDogWithSauce;
    export let currentDifficultyValues: DifficultyInformation; 
    
    
 
    export class SceneBuilder {

        private static instance: SceneBuilder = new SceneBuilder;

        public levelStatus: Level;
        public gameState: GAMESTATE;
        public walls: f.Node;
        public nextLvl: Level;
        public sauceContainers: f.Node;
        public currentDifficulty: Difficulty = Difficulty.virgin;
        public itemNameDiv: HTMLElement;
        public itemNumberDiv: HTMLElement;
        private canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("gameScreen");
        private itemCounter: HTMLElement = <HTMLElement>document.getElementById("currentItem");
        private volumeDiv: HTMLDivElement;
        private volumeSlider: HTMLInputElement;
        private backgroundMusic: HTMLAudioElement;
        private homeButton: HTMLElement;


        public constructor() {
            if (SceneBuilder.instance)
                throw new Error("Use SceneBuilder.getInstance() instead new SceneBuilder");
            SceneBuilder.instance = this;
            console.log("SceneBilder is now available.");
        }

        public static getInstance(): SceneBuilder {
            return SceneBuilder.instance;
        }

        public playAudio(url: string, volume: number, _loop: boolean): HTMLAudioElement {

            let audio: HTMLAudioElement = document.createElement("audio");
            audio.style.display = "none";
            audio.src = url;
            audio.volume = volume;
            audio.autoplay = true;
            if (!_loop)
            audio.onended = function(): void {
                audio.remove(); 
              };
            else
            audio.onended = function(): void {
                audio.play(); 
              };
            
            document.body.appendChild(audio);

            return audio;
          }

          public hndCurrentLvl(): void {

            switch (sceneBuilder1.levelStatus) {
                case sceneBuilder1.levelStatus = Level.MENU: {
                    
                    break;
                }
                case sceneBuilder1.levelStatus = Level.ONE: {
                    
                    sausageShooterOne.updateSausageShooter9000();
                    //console.log(this.walls);
                    hotDogBunOne.updateHotDogBun(this.walls);
                    
                    break;
                }
                case sceneBuilder1.levelStatus = Level.TWO: {
                     
                    hotDogOne.updateHotDog(this.walls);
                    for (let sauceContainer of this.sauceContainers.getChildren()) {
                        let currentSauceContainer: SauceContainer = <SauceContainer>sauceContainer;
                        currentSauceContainer.updateSaucecontainer();
                    }
                    //this.sauceContainers.getChild(0);
                    
                    break;
                }
                case sceneBuilder1.levelStatus = Level.THREE: {
                    pickleJarOne.updatePickleJar();
                    hotDogWithSauceOne.updateHotDogWithSauce();
                    break;
                }
                case sceneBuilder1.levelStatus = Level.GOAL: {

                    break;
                }
                case sceneBuilder1.levelStatus = Level.GAMEOVER: {
                    //sceneBuilder1.readyCurrentLevel(Level.GAMEOVER);
                    break;
                }
                case sceneBuilder1.levelStatus = Level.NEXTLEVEL:
                    //sceneBuilder1.levelStatus = this.selectNextLevel();
                    sceneBuilder1.readyCurrentLevel(this.selectNextLevel());
                    
                    break;
            }
        }

        public readyCurrentLevel(_level: Level): void {
            this.itemNameDiv = <HTMLElement>document.getElementById("currentItem");
            this.itemNumberDiv = <HTMLElement>document.getElementById("numberOfItems");
            switch (_level) {
                case _level = Level.MENU: {
                    root.removeAllChildren();
                    this.backgroundMusic = this.playAudio("../sounds/gameMusic.mp3", 0.4, true);
                    this.levelStatus = _level;
                    this.nextLvl = Level.ONE;
                    this.hndDifficultyButtons();

                    //this.buildBackground();
                    //this.buildStartButton();
                    this.itemNameDiv.innerHTML = "";
                    this.itemNumberDiv.innerHTML = "";
                    break;
                }
                case _level = Level.ONE: {
                    root.removeAllChildren();
                    this.makeSettingsVisible();
                    this.canvas.style.visibility = "visible";
                    this.levelStatus = _level;
                    this.nextLvl = Level.TWO;
                    this.removeDifficultySettings();
                    this.buildBackground();
                    this.buildLevel1();
                    this.itemNameDiv.innerHTML = "Sausages: ";
                    break;
                }
                case _level = Level.TWO: {
                    root.removeAllChildren();
                    /* sausageShooterOne.pauseSausageShooter(sausageShooterOne);
                    canvas.removeEventListener("mousedown", sausageShooterOne.hndShoot); */
                    this.levelStatus = _level;
                    this.nextLvl = Level.THREE;
                    this.buildBackground();
                    this.buildLevel2();
                    this.itemNameDiv.innerHTML = "Sauce: ";

                    break;
                }
                case _level = Level.THREE: {
                    root.removeAllChildren();
                    this.levelStatus = _level;
                    this.nextLvl = Level.GOAL;
                    this.buildBackground();
                    this.buildLevel3();
                    this.itemNameDiv.innerHTML = "Pickles left: ";
                    break;
                }
                case _level = Level.GOAL: {
                    this.levelStatus = _level;
                    this.canvas.style.visibility = "hidden";
                    this.itemCounter.style.visibility = "hidden";
                    this.buildFinishScreen();
                    break;
                }
                case _level = Level.GAMEOVER: {
                    this.levelStatus = _level;
                    this.canvas.style.visibility = "hidden";
                    this.itemCounter.style.visibility = "hidden";
                    this.buildGameOverScreen();
                    break;
                }
            }
        }
        
        private hndDifficultyButtons(): void {
            let ankerDifficulty1: HTMLElement = <HTMLElement>document.getElementById("difficultyPic1");
            let ankerDifficulty2: HTMLElement = <HTMLElement>document.getElementById("difficultyPic2");
            let ankerDifficulty3: HTMLElement = <HTMLElement>document.getElementById("difficultyPic3");
            /* let buttonDifficulty1: HTMLButtonElement = <HTMLButtonElement>document.createElement("button");
            let buttonDifficulty2: HTMLButtonElement = <HTMLButtonElement>document.createElement("button");
            let buttonDifficulty3: HTMLButtonElement = <HTMLButtonElement>document.createElement("button"); */

            ankerDifficulty1.addEventListener("click", this.hndDifficulty1);
            //buttonDifficulty1.innerHTML = "Virgin";
            //buttonDifficulty1.setAttribute("id", "diff1");
            ankerDifficulty2.addEventListener("click", this.hndDifficulty2);
           // buttonDifficulty2.innerHTML = "Normal";
            //buttonDifficulty2.setAttribute("id", "diff2");
            ankerDifficulty3.addEventListener("click", this.hndDifficulty3);
            //buttonDifficulty3.innerHTML = "Sausage Lover";
            //buttonDifficulty3.setAttribute("id", "diff3");

            /* ankerDifficulty1.appendChild(buttonDifficulty1);
            ankerDifficulty2.appendChild(buttonDifficulty2);
            ankerDifficulty3.appendChild(buttonDifficulty3); */
        }

        private hndDifficulty1(_event: Event): void {
            console.log("Difficulty: Virgin");
            this.currentDifficulty = Difficulty.virgin;
            sceneBuilder1.hndCurrentDifficulty("Virgin");
            
        }
        private hndDifficulty2(_event: Event): void {
            console.log("Difficulty: Normal");
            this.currentDifficulty = Difficulty.normal;
            sceneBuilder1.hndCurrentDifficulty("Normal");
        }
        private hndDifficulty3(_event: Event): void {
            console.log("Difficulty: Sausage Lover");
            this.currentDifficulty = Difficulty.sausageLover;
            sceneBuilder1.hndCurrentDifficulty("SausageLover");
        }

        private hndCurrentDifficulty(_difficulty: string): void {
            for (let i: number = 0; i < difficultyList.length; i++) {
                if (difficultyList[i].name == _difficulty) {
                    currentDifficultyValues = difficultyList[i];
                    console.log(difficultyList[i].name);
                    break;
                }
            }
            this.playAudio("../sounds/letsGo.mp3", 1, false);
            
            sceneBuilder1.readyCurrentLevel(Level.ONE);
        }

        private removeDifficultySettings(): void {
            let buttonDiv: HTMLElement = <HTMLElement>document.getElementById("difficultyDiv");
            
            buttonDiv.innerHTML = "";
        }

        private makeSettingsVisible(): void {
            this.volumeDiv = <HTMLDivElement>document.getElementById("volumeDiv");
            this.volumeDiv.style.visibility = "visible";
            this.homeButton = <HTMLElement>document.getElementById("homePic");
            this.homeButton.style.visibility = "visible";

            this.volumeSlider = <HTMLInputElement>document.getElementById("volumeSlider");
            this.volumeSlider.addEventListener("change", this.hndVolumeAdjustment);
        }

        private hideSettings(): void {
            this.volumeDiv.style.visibility = "hidden";
            this.homeButton.style.visibility = "hidden";
        }

        private hndVolumeAdjustment(): void {
            sceneBuilder1.backgroundMusic.volume = Number(sceneBuilder1.volumeSlider.value);
        }

        
        

        private selectNextLevel(): Level {
            switch (sceneBuilder1.nextLvl) {
            
                case sceneBuilder1.nextLvl = Level.ONE: {
                    return Level.ONE;

                }
                case sceneBuilder1.nextLvl = Level.TWO: {
                    return Level.TWO;
                }
                case sceneBuilder1.nextLvl = Level.THREE: {
                    return Level.THREE;
                }
                case sceneBuilder1.nextLvl = Level.GOAL: {
                    return Level.GOAL;
                }
            }
            return Level.MENU;
        }

        private buildBackground(): void {

            let meshQuad: f.MeshQuad = new f.MeshQuad("Quad");        
            let txtBackground: f.TextureImage = new f.TextureImage("../assets/backgroundTest.png");
            let mtrBackground: f.Material = new f.Material("Background", f.ShaderTexture, new f.CoatTextured(f.Color.CSS("WHITE"), txtBackground));
            let background: faid.Node = new faid.Node("Background", f.Matrix4x4.ROTATION_X(0), mtrBackground, meshQuad);
            background.mtxLocal.scale(f.Vector3.ONE(30));
            background.mtxLocal.scaleX(10);
            background.mtxLocal.translateX(-0.3);
    
            root.appendChild(background); 
        }


        private buildWalls(_left: number, _right: number, _depth: number): void {
            let wallLeft: Wall = new Wall("wallLeft", new f.Vector3(_left, 0, _depth), new f.Vector2(1, 30));
            
            let wallRight: Wall = new Wall("wallRight", new f.Vector3(_right, 0, _depth), new f.Vector2(1, 30));
            
            this.walls = new f.Node("Walls");
            this.walls.addChild(wallLeft);
            this.walls.addChild(wallRight);
            console.log(this.walls);
            root.appendChild(this.walls);
            
        }



    
        private buildLevel1(): void {
            console.log("Build lvl 1");
            this.buildWalls(-15, 15, 0);
            this.buildSausageShooter9000();
            this.buildHotDogBun();
        }

        

        private buildHotDogBun(): void {
            let positionHotDogBun: f.Vector3 = new f.Vector3(0, 10, 2);
            let sizeHotDogBun: f.Vector2 = new f.Vector2(5, 6);
            hotDogBunOne = new HotDogBun("hotDogBun1", positionHotDogBun, sizeHotDogBun);
            root.appendChild(hotDogBunOne);
        }


        private buildSausageShooter9000(): void {
            
            let positionSausageShooter9000: f.Vector3 = new f.Vector3(-4, -7, 5); 
            let sizeSausageShooter9000: f.Vector2 = new f.Vector2(15, 8);
            sausageShooterOne = new SausageShooter9000("sausageshooter90001", positionSausageShooter9000, sizeSausageShooter9000 );
            sausageShooterOne.mtxLocal.scaleX(2);
            root.appendChild(sausageShooterOne);
            sausageShooterOne.readySausageShooter(sausageShooterOne);
            
        }

        
    
        private buildLevel2(): void {
            console.log("Build lvl 2");
            this.buildWalls(-18, 18, 0);
            this.buildHotDog();
            this.buildSauceContainers();
        }


        private buildSauceContainers(): void {
            this.sauceContainers = new f.Node("SauceContainers");
            for (let i: number = 0; i < 3; i++) {
                let sauceContainer: SauceContainer = new SauceContainer("sauceContainer" + `${i}`, new f.Vector3(-12 + i * 12, 8, 10), new f.Vector2(2, 5));
                console.log(this);
                this.sauceContainers.appendChild(sauceContainer);
            }
            root.appendChild(this.sauceContainers);
        }


        private buildHotDog(): void {
            let positionHotDog: f.Vector3 = new f.Vector3(0, -8, 5);
            hotDogOne = new HotDog("HotDogOne", positionHotDog, new f.Vector2(6, 2));
            root.appendChild(hotDogOne);
        }


    
        private buildLevel3(): void {
            this.buildPickleJar();
            this.buildHotDogWithSauce();
        }

        private buildPickleJar(): void {
            let positionPickleJar: f.Vector3 = new f.Vector3(8, -6 , 5);
            pickleJarOne = new PickleJar("pickleJarOne", positionPickleJar, new f.Vector2(6, 8));
            root.appendChild(pickleJarOne);

        }

        private buildHotDogWithSauce(): void {
            let positionHotDogWithSauce: f.Vector3 = new f.Vector3(-6, -8 , 5);
            hotDogWithSauceOne = new HotDogWithSauce("HotDogWithSauceOne", positionHotDogWithSauce, new f.Vector2(9, 3));
            root.appendChild(hotDogWithSauceOne);
        }



        private buildFinishScreen(): void {

            this.hideSettings();
            this.playAudio("../sounds/winnerVoice.mp3", 1, false);
            let continueButton: HTMLImageElement = <HTMLImageElement>document.createElement("img");
            let anker: HTMLDivElement = <HTMLDivElement>document.getElementById("endingAnker");
            let div: HTMLDivElement = <HTMLDivElement>document.getElementById("endingDiv");
            let winningText: HTMLElement = <HTMLElement>document.createElement("h1");

            continueButton.setAttribute("src", "../assets/money.png");
            anker.appendChild(continueButton);
            winningText.innerHTML = "Nice Job - Collect your reward and keep going";
            div.appendChild(winningText);
            this.itemNumberDiv.innerHTML = "";    
        }

        private buildGameOverScreen(): void {

            this.hideSettings();
            this.playAudio("../sounds/gameOverVoice.mp3", 1, false);
            let continueButton: HTMLImageElement = <HTMLImageElement>document.createElement("img");
            let anker: HTMLDivElement = <HTMLDivElement>document.getElementById("gameOverAnker");
            let div: HTMLDivElement = <HTMLDivElement>document.getElementById("gameOverDiv");
            let winningText: HTMLElement = <HTMLElement>document.createElement("h1");

            continueButton.setAttribute("src", "../assets/death.png");
            anker.appendChild(continueButton);
            winningText.innerHTML = "Oh - seems like you need more practice!";
            div.appendChild(winningText);
            this.itemNumberDiv.innerHTML = "";  
        }



        
    }

    


    

    
}