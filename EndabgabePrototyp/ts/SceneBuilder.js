"use strict";
var EndabgabePrototyp;
(function (EndabgabePrototyp) {
    var f = FudgeCore;
    var faid = FudgeAid;
    let Level;
    (function (Level) {
        Level[Level["MENU"] = 0] = "MENU";
        Level[Level["ONE"] = 1] = "ONE";
        Level[Level["TWO"] = 2] = "TWO";
        Level[Level["THREE"] = 3] = "THREE";
        Level[Level["GAMEOVER"] = 4] = "GAMEOVER";
        Level[Level["GOAL"] = 5] = "GOAL";
        Level[Level["NEXTLEVEL"] = 6] = "NEXTLEVEL";
    })(Level = EndabgabePrototyp.Level || (EndabgabePrototyp.Level = {}));
    let Difficulty;
    (function (Difficulty) {
        Difficulty[Difficulty["virgin"] = 0] = "virgin";
        Difficulty[Difficulty["normal"] = 1] = "normal";
        Difficulty[Difficulty["sausageLover"] = 2] = "sausageLover";
    })(Difficulty = EndabgabePrototyp.Difficulty || (EndabgabePrototyp.Difficulty = {}));
    class SceneBuilder {
        /* public buttonDifficulty1: HTMLButtonElement = <HTMLButtonElement>document.getElementById("buttonDifficulty1");
        public buttonDifficulty2: HTMLButtonElement = <HTMLButtonElement>document.getElementById("buttonDifficulty2");
        public buttonDifficulty3: HTMLButtonElement = <HTMLButtonElement>document.getElementById("buttonDifficulty3"); */
        constructor() {
            this.currentDifficulty = Difficulty.virgin;
            this.canvas = document.getElementById("gameScreen");
            this.itemCounter = document.getElementById("currentItem");
            if (SceneBuilder.instance)
                throw new Error("Use SceneBuilder.getInstance() instead new SceneBuilder");
            SceneBuilder.instance = this;
            console.log("SceneBilder is now available.");
        }
        static getInstance() {
            return SceneBuilder.instance;
        }
        hndDifficultyButtons() {
            let ankerDifficulty1 = document.getElementById("difficultyPic1");
            let ankerDifficulty2 = document.getElementById("difficultyPic2");
            let ankerDifficulty3 = document.getElementById("difficultyPic3");
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
        hndDifficulty1(_event) {
            console.log("Difficulty: Virgin");
            this.currentDifficulty = Difficulty.virgin;
            EndabgabePrototyp.sceneBuilder1.hndCurrentDifficulty("Virgin");
        }
        hndDifficulty2(_event) {
            console.log("Difficulty: Normal");
            this.currentDifficulty = Difficulty.normal;
            EndabgabePrototyp.sceneBuilder1.hndCurrentDifficulty("Normal");
        }
        hndDifficulty3(_event) {
            console.log("Difficulty: Sausage Lover");
            this.currentDifficulty = Difficulty.sausageLover;
            EndabgabePrototyp.sceneBuilder1.hndCurrentDifficulty("SausageLover");
        }
        hndCurrentDifficulty(_difficulty) {
            for (let i = 0; i < EndabgabePrototyp.difficultyList.length; i++) {
                /* switch (difficultyList[i].name) {
                    case difficultyList[i].name = _difficulty: {
                        currentDifficultyValues = difficultyList[i];
                        console.log(difficultyList[i].name);
                        break;
                    }
                    
                } */
                if (EndabgabePrototyp.difficultyList[i].name == _difficulty) {
                    EndabgabePrototyp.currentDifficultyValues = EndabgabePrototyp.difficultyList[i];
                    console.log(EndabgabePrototyp.difficultyList[i].name);
                    break;
                }
            }
            this.playAudio("../sounds/letsGo.mp3", 1, false);
            this.canvas.style.visibility = "visible";
            EndabgabePrototyp.sceneBuilder1.readyCurrentLevel(Level.ONE);
        }
        /* public getMousePos(_event: MouseEvent): void {
            console.log("Mousclick...");
            let rect: DOMRect = canvas.getBoundingClientRect();
            let x: number = _event.clientX - rect.left;
            let y: number = _event.clientY - rect.top;
            console.log("Coordinate x: " + x, "Coordinate y: " + y);
            //sceneBuilder1.hndCurrentDifficulty();
        } */
        removeDifficultySettings() {
            let buttonDiv = document.getElementById("difficultyDiv");
            buttonDiv.innerHTML = "";
        }
        readyCurrentLevel(_level) {
            this.itemNameDiv = document.getElementById("currentItem");
            this.itemNumberDiv = document.getElementById("numberOfItems");
            switch (_level) {
                case _level = Level.MENU: {
                    EndabgabePrototyp.root.removeAllChildren();
                    //canvas.addEventListener("mousedown", this.getMousePos);
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
                    EndabgabePrototyp.root.removeAllChildren();
                    //canvas.removeEventListener("mousedown", this.getMousePos);
                    this.levelStatus = _level;
                    this.nextLvl = Level.TWO;
                    this.removeDifficultySettings();
                    this.buildBackground();
                    this.buildLevel1();
                    this.itemNameDiv.innerHTML = "Sausages: ";
                    break;
                }
                case _level = Level.TWO: {
                    EndabgabePrototyp.root.removeAllChildren();
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
                    EndabgabePrototyp.root.removeAllChildren();
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
        hndCurrentLvl() {
            switch (EndabgabePrototyp.sceneBuilder1.levelStatus) {
                case EndabgabePrototyp.sceneBuilder1.levelStatus = Level.MENU: {
                    break;
                }
                case EndabgabePrototyp.sceneBuilder1.levelStatus = Level.ONE: {
                    EndabgabePrototyp.sausageShooterOne.updateSausageShooter9000();
                    //console.log(this.walls);
                    EndabgabePrototyp.hotDogBunOne.updateHotDogBun(this.walls);
                    break;
                }
                case EndabgabePrototyp.sceneBuilder1.levelStatus = Level.TWO: {
                    EndabgabePrototyp.hotDogOne.updateHotDog(this.walls);
                    for (let sauceContainer of this.sauceContainers.getChildren()) {
                        let currentSauceContainer = sauceContainer;
                        currentSauceContainer.updateSaucecontainer();
                    }
                    //this.sauceContainers.getChild(0);
                    break;
                }
                case EndabgabePrototyp.sceneBuilder1.levelStatus = Level.THREE: {
                    EndabgabePrototyp.pickleJarOne.updatePickleJar();
                    EndabgabePrototyp.hotDogWithSauceOne.updateHotDogWithSauce();
                    break;
                }
                case EndabgabePrototyp.sceneBuilder1.levelStatus = Level.GOAL: {
                    break;
                }
                case EndabgabePrototyp.sceneBuilder1.levelStatus = Level.GAMEOVER: {
                    //sceneBuilder1.readyCurrentLevel(Level.GAMEOVER);
                    break;
                }
                case EndabgabePrototyp.sceneBuilder1.levelStatus = Level.NEXTLEVEL:
                    //sceneBuilder1.levelStatus = this.selectNextLevel();
                    EndabgabePrototyp.sceneBuilder1.readyCurrentLevel(this.selectNextLevel());
                    break;
            }
        }
        playAudio(url, volume, _loop) {
            let audio = document.createElement("audio");
            audio.style.display = "none";
            audio.src = url;
            audio.volume = volume;
            audio.autoplay = true;
            if (!_loop)
                audio.onended = function () {
                    audio.remove();
                };
            else
                audio.onended = function () {
                    audio.play();
                };
            document.body.appendChild(audio);
        }
        selectNextLevel() {
            switch (EndabgabePrototyp.sceneBuilder1.nextLvl) {
                case EndabgabePrototyp.sceneBuilder1.nextLvl = Level.ONE: {
                    return Level.ONE;
                }
                case EndabgabePrototyp.sceneBuilder1.nextLvl = Level.TWO: {
                    return Level.TWO;
                }
                case EndabgabePrototyp.sceneBuilder1.nextLvl = Level.THREE: {
                    return Level.THREE;
                }
                case EndabgabePrototyp.sceneBuilder1.nextLvl = Level.GOAL: {
                    return Level.GOAL;
                }
            }
            return Level.MENU;
        }
        buildBackground() {
            let meshQuad = new f.MeshQuad("Quad");
            let txtBackground = new f.TextureImage("../assets/backgroundTest.png");
            let mtrBackground = new f.Material("Background", f.ShaderTexture, new f.CoatTextured(f.Color.CSS("WHITE"), txtBackground));
            let floor = new faid.Node("Background", f.Matrix4x4.ROTATION_X(0), mtrBackground, meshQuad);
            floor.mtxLocal.scale(f.Vector3.ONE(30));
            floor.mtxLocal.scaleX(10);
            floor.mtxLocal.translateX(-0.3);
            //floor.getComponent(f.ComponentMaterial).pivot.scale(f.Vector2.ONE(1));
            EndabgabePrototyp.root.appendChild(floor);
        }
        
        buildWalls(_left, _right, _depth) {
            let wallLeft = new EndabgabePrototyp.Wall("wallLeft", new f.Vector3(_left, 0, _depth), new f.Vector2(1, 30));
            let wallRight = new EndabgabePrototyp.Wall("wallRight", new f.Vector3(_right, 0, _depth), new f.Vector2(1, 30));
            this.walls = new f.Node("Walls");
            /* _this.walls.push(wallLeft);
            _this.walls.push(wallRight); */
            this.walls.addChild(wallLeft);
            this.walls.addChild(wallRight);
            console.log(this.walls);
            /* root.appendChild(wallLeft);
            root.appendChild(wallRight); */
            EndabgabePrototyp.root.appendChild(this.walls);
        }
        buildLevel1() {
            console.log("Build lvl 1");
            this.buildWalls(-15, 15, 0);
            this.buildSausageShooter9000();
            this.buildHotDogBun();
        }
        buildHotDogBun() {
            let positionHotDogBun = new f.Vector3(0, 10, 2);
            let sizeHotDogBun = new f.Vector2(5, 6);
            EndabgabePrototyp.hotDogBunOne = new EndabgabePrototyp.HotDogBun("hotDogBun1", positionHotDogBun, sizeHotDogBun);
            EndabgabePrototyp.root.appendChild(EndabgabePrototyp.hotDogBunOne);
            //this.buildHotDogRail();
        }
        /* private buildHotDogRail(): void {
            let hotDogRail: Wall = new Wall("HotDogRail", new f.Vector3(0, 10, 2), new f.Vector2(30, 1));
            //this.walls.addChild(hotDogRail);
            root.appendChild(hotDogRail);
        } */
        buildSausageShooter9000() {
            let positionSausageShooter9000 = new f.Vector3(-4, -7, 5);
            let sizeSausageShooter9000 = new f.Vector2(15, 8);
            EndabgabePrototyp.sausageShooterOne = new EndabgabePrototyp.SausageShooter9000("sausageshooter90001", positionSausageShooter9000, sizeSausageShooter9000);
            EndabgabePrototyp.sausageShooterOne.mtxLocal.scaleX(2);
            EndabgabePrototyp.root.appendChild(EndabgabePrototyp.sausageShooterOne);
            //sausageShooterOne.buildSausage();
            EndabgabePrototyp.sausageShooterOne.readySausageShooter(EndabgabePrototyp.sausageShooterOne);
            //canvas.addEventListener("mousedown", sausageShooterOne.shootSausage);
        }
        /* private buildSausage(_sausageShooter9000: SausageShooter9000): void {
            let sausageNumber: number = _sausageShooter9000.numberOfSausages;
            let sausageName: string = "Sausage" + `${sausageNumber}`;
            let positionSausage: f.Vector3 = new f.Vector3(-0.85, 0, -1);
            let sizeSausage: f.Vector2 = new f.Vector2(1, 5);

            let sausage: Sausage = new Sausage(sausageName, positionSausage, sizeSausage);
            _sausageShooter9000.currentSausage = sausage;
            //currentSausage = sausage;
            _sausageShooter9000.appendChild(sausage);
        } */
        buildLevel2() {
            console.log("Build lvl 2");
            this.buildWalls(-18, 18, 0);
            this.buildHotDog();
            this.buildSauceContainers();
        }
        buildSauceContainers() {
            this.sauceContainers = new f.Node("SauceContainers");
            for (let i = 0; i < 3; i++) {
                let sauceContainer = new EndabgabePrototyp.SauceContainer("sauceContainer" + `${i}`, new f.Vector3(-12 + i * 12, 8, 10), new f.Vector2(2, 5));
                console.log(this);
                this.sauceContainers.appendChild(sauceContainer);
            }
            EndabgabePrototyp.root.appendChild(this.sauceContainers);
        }
        buildHotDog() {
            let positionHotDog = new f.Vector3(0, -8, 5);
            EndabgabePrototyp.hotDogOne = new EndabgabePrototyp.HotDog("HotDogOne", positionHotDog, new f.Vector2(6, 2));
            EndabgabePrototyp.root.appendChild(EndabgabePrototyp.hotDogOne);
            //hotDogOne.mtxLocal.scaleX(3);
        }
        buildLevel3() {
            console.log("Build lvl 3");
            //this.buildWalls(-15, 15, 10);
            this.buildPickleJar();
            this.buildHotDogWithSauce();
        }
        buildPickleJar() {
            let positionPickleJar = new f.Vector3(8, -6, 5);
            EndabgabePrototyp.pickleJarOne = new EndabgabePrototyp.PickleJar("pickleJarOne", positionPickleJar, new f.Vector2(6, 8));
            EndabgabePrototyp.root.appendChild(EndabgabePrototyp.pickleJarOne);
            //pickleJarOne.readyPickleJar(pickleJarOne);
        }
        buildHotDogWithSauce() {
            let positionHotDogWithSauce = new f.Vector3(-6, -8, 5);
            EndabgabePrototyp.hotDogWithSauceOne = new EndabgabePrototyp.HotDogWithSauce("HotDogWithSauceOne", positionHotDogWithSauce, new f.Vector2(9, 3));
            EndabgabePrototyp.root.appendChild(EndabgabePrototyp.hotDogWithSauceOne);
        }
        /* private hndStartGame(): void {
            console.log("Start Game");
        } */
        buildFinishScreen() {
            this.playAudio("../sounds/winnerVoice.mp3", 1, false);
            let continueButton = document.createElement("img");
            let anker = document.getElementById("endingAnker");
            let div = document.getElementById("endingDiv");
            let winningText = document.createElement("h1");
            continueButton.setAttribute("src", "../assets/money.png");
            anker.appendChild(continueButton);
            winningText.innerHTML = "Nice Job - Collect your reward and keep going";
            div.appendChild(winningText);
            this.itemNumberDiv.innerHTML = "";
        }
        buildGameOverScreen() {
            this.playAudio("../sounds/gameOverVoice.mp3", 1, false);
            let continueButton = document.createElement("img");
            let anker = document.getElementById("gameOverAnker");
            let div = document.getElementById("gameOverDiv");
            let winningText = document.createElement("h1");
            continueButton.setAttribute("src", "../assets/death.png");
            anker.appendChild(continueButton);
            winningText.innerHTML = "Oh - seems like you need more practice!";
            div.appendChild(winningText);
            this.itemNumberDiv.innerHTML = "";
        }
    }
    SceneBuilder.instance = new SceneBuilder;
    EndabgabePrototyp.SceneBuilder = SceneBuilder;
})(EndabgabePrototyp || (EndabgabePrototyp = {}));
//# sourceMappingURL=SceneBuilder.js.map