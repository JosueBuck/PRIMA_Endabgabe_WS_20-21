"use strict";
var EndabgabePrototyp;
(function (EndabgabePrototyp) {
    async function hndJson(_url) {
        let response = await fetch(_url);
        let responseJson = await response.json();
        EndabgabePrototyp.difficultyList = await JSON.parse(JSON.stringify(responseJson));
        EndabgabePrototyp.currentDifficultyValues = EndabgabePrototyp.difficultyList[0];
    }
    EndabgabePrototyp.hndJson = hndJson;
})(EndabgabePrototyp || (EndabgabePrototyp = {}));
var EndabgabePrototyp;
(function (EndabgabePrototyp) {
    var f = FudgeCore;
    class GameObject extends f.Node {
        constructor(_name, _position, _size) {
            super(_name);
            this.rect = new f.Rectangle(_position.x, _position.y, _size.x, _size.y, f.ORIGIN2D.CENTER);
            this.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(_position)));
            let cmpQuad = new f.ComponentMesh(GameObject.meshQuad);
            this.addComponent(cmpQuad);
            cmpQuad.pivot.scale(_size.toVector3(0));
            //this.constructCollisionRect();
            /* let cMaterial: f.ComponentMaterial = new f.ComponentMaterial(GameObject.mtrSolidWhite);
            this.addComponent(cMaterial); */
        }
        //this.rect = new f.Rectangle(_position.x, _position.y, _size.x, _size.y, f.ORIGIN2D.CENTER);
        constructCollisionRect(_decreaseRect2, _changeCalues) {
            let cmpQuad = this.getComponent(f.ComponentMesh);
            //console.log(cmpQuad.pivot.toString());
            let mtxTotal = f.Matrix4x4.MULTIPLICATION(this.mtxWorld, cmpQuad.pivot);
            let point1 = new f.Vector3(0.5, 0.5, 0);
            let point2 = new f.Vector3(-0.5, -0.5, 0);
            point1.transform(mtxTotal, true);
            point2.transform(mtxTotal, true);
            let posClient1 = EndabgabePrototyp.viewport.pointWorldToClient(point1);
            let posClient2 = EndabgabePrototyp.viewport.pointWorldToClient(point2);
            /* posClient1.x -= _decreaseRect2.x * 30; //50
            posClient1.y += _decreaseRect2.y * 50; //120
            posClient2.x += _decreaseRect2.x * 30; //50
            posClient2.y += _decreaseRect2.x * -10; */
            posClient1.x -= _decreaseRect2.x * _changeCalues[0]; //50
            posClient1.y += _decreaseRect2.y * _changeCalues[1]; //120
            posClient2.x += _decreaseRect2.x * _changeCalues[2]; //50
            posClient2.y += _decreaseRect2.x * -_changeCalues[3];
            console.log(_decreaseRect2.y * 40);
            //crc2.strokeRect(posClient1.x, posClient1.y, posClient2.x - posClient1.x, posClient2.y - posClient1.y);
            //console.log(point1.toString(), point2.toString());
            let newRect = this.createRectangle(posClient1, posClient2);
            this.rect2 = newRect;
            //let posClient: f.Vector2 = viewport.pointWorldToClient(hotDogOne.mtxWorld.translation);
        }
        createRectangle(_posClient1, _posClient2) {
            let rect = new f.Rectangle(_posClient1.x, _posClient1.y, _posClient2.x - _posClient1.x, _posClient2.y - _posClient1.y);
            return rect;
        }
    }
    GameObject.meshQuad = new f.MeshQuad();
    EndabgabePrototyp.GameObject = GameObject;
})(EndabgabePrototyp || (EndabgabePrototyp = {}));
var EndabgabePrototyp;
(function (EndabgabePrototyp) {
    var f = FudgeCore;
    class HotDog extends EndabgabePrototyp.GameObject {
        constructor(_name, _position, _size) {
            super(_name, _position, _size);
            this.numberOfSauceLoadsOnHotDog = 0;
            this.speed = 30;
            this.ctrMovement = new f.Control("HotDogSpeed", 0.3, 0 /* PROPORTIONAL */);
            this.displayNumberOfSauceLoads = document.getElementById("numberOfItems");
            let txtHotDog = new f.TextureImage("../assets/HotDog.png");
            let mtrHotDog = new f.Material("Sausage", f.ShaderTexture, new f.CoatTextured(f.Color.CSS("WHITE"), txtHotDog));
            let cmpMaterial = new f.ComponentMaterial(mtrHotDog);
            cmpMaterial.pivot.scale(f.Vector2.ONE(1));
            this.addComponent(cmpMaterial);
        }
        updateHotDog(_walls) {
            this.ctrMovement.setDelay(100);
            this.ctrMovement.setInput(f.Keyboard.mapToValue(-1, 0, [f.KEYBOARD_CODE.A, f.KEYBOARD_CODE.ARROW_LEFT])
                + f.Keyboard.mapToValue(1, 0, [f.KEYBOARD_CODE.D, f.KEYBOARD_CODE.ARROW_RIGHT]));
            this.posOld = this.mtxLocal.translation;
            this.moveHotDog(this.ctrMovement.getOutput(), _walls);
            this.displayNumberOfSauceLoads.innerHTML = "" + this.numberOfSauceLoadsOnHotDog;
            if (this.numberOfSauceLoadsOnHotDog >= EndabgabePrototyp.currentDifficultyValues.numberOfNeededSauce) {
                EndabgabePrototyp.sceneBuilder1.gameState = EndabgabePrototyp.GAMESTATE.PAUSE;
                setTimeout(function () { EndabgabePrototyp.sceneBuilder1.gameState = EndabgabePrototyp.GAMESTATE.PLAY; }, 3000);
                EndabgabePrototyp.sceneBuilder1.levelStatus = EndabgabePrototyp.Level.NEXTLEVEL;
            }
        }
        moveHotDog(_direction, _walls) {
            this.mtxLocal.translateX(_direction * this.speed * f.Loop.timeFrameGame / 1000);
            this.constructCollisionRect(new f.Vector2(0, 0), [0, 0, 0, 0]);
            //console.log(this);
            this.rect.position.x = this.mtxLocal.translation.x - this.rect.size.x / 2;
            this.rect.position.y = this.mtxLocal.translation.y - this.rect.size.y / 2;
            this.hndWallCollision(_walls);
        }
        hndWallCollision(_walls) {
            for (let wall of _walls.getChildren()) {
                this.checkWallCollision(wall);
            }
        }
        checkWallCollision(_wall) {
            let intersection = this.rect.getIntersection(_wall.rect);
            /* console.log(_wall.rect);
            console.log(this.rect); */
            console.log(this.rect.position);
            if (intersection == null)
                return;
            else if (intersection != null) {
                console.log("collision");
                let difference = this.mtxLocal.translation.x - this.posOld.x;
                let direction;
                if (difference >= 0) {
                    direction = -1;
                }
                else
                    direction = 1;
                this.mtxLocal.translation = this.posOld;
                this.rect.position.x = this.posOld.x - this.rect.size.x / 2;
                this.rect.position.y = this.posOld.y - this.rect.size.y / 2;
                while (this.rect.getIntersection(_wall.rect) != null) {
                    this.mtxLocal.translateX(this.speed * direction * 0.01 * f.Loop.timeFrameGame / 1000);
                    //this.rect.position.x += this.speed * direction * 0.01  * f.Loop.timeFrameGame / 1000;
                    this.rect.position.x = this.mtxLocal.translation.x - this.rect.size.x / 2;
                    this.rect.position.y = this.mtxLocal.translation.y - this.rect.size.y / 2;
                }
            }
        }
    }
    EndabgabePrototyp.HotDog = HotDog;
})(EndabgabePrototyp || (EndabgabePrototyp = {}));
var EndabgabePrototyp;
(function (EndabgabePrototyp) {
    var f = FudgeCore;
    //import fAid = FudgeAid;
    let BUNSTATE;
    (function (BUNSTATE) {
        BUNSTATE[BUNSTATE["WAITING"] = 0] = "WAITING";
        BUNSTATE[BUNSTATE["MOVING"] = 1] = "MOVING";
    })(BUNSTATE = EndabgabePrototyp.BUNSTATE || (EndabgabePrototyp.BUNSTATE = {}));
    class HotDogBun extends EndabgabePrototyp.GameObject {
        constructor(_name, _position, _size) {
            super(_name, _position, _size);
            this.bunState = BUNSTATE.MOVING;
            this.speed = EndabgabePrototyp.currentDifficultyValues.hotDogBunSpeed;
            let txtSausage = new f.TextureImage("../assets/bun.png");
            let mtrSausage = new f.Material("Sausage", f.ShaderTexture, new f.CoatTextured(f.Color.CSS("WHITE"), txtSausage));
            let cmpMaterial = new f.ComponentMaterial(mtrSausage);
            cmpMaterial.pivot.scale(f.Vector2.ONE(1));
            this.addComponent(cmpMaterial);
        }
        updateHotDogBun(_walls) {
            this.posOld = this.mtxLocal.translation;
            this.hndWallCollision(_walls);
        }
        hndWallCollision(_walls) {
            for (let wall of _walls.getChildren()) {
                this.checkWallCollision(wall);
            }
        }
        checkWallCollision(_wall) {
            let intersection = this.rect.getIntersection(_wall.rect);
            if (intersection == null)
                this.move(this.speed);
            else if (intersection != null) {
                this.mtxLocal.translation = this.posOld;
                this.speed = this.speed * (-1);
                while (this.rect.getIntersection(_wall.rect) != null) {
                    this.mtxLocal.translateX(this.speed * 0.01 * f.Loop.timeFrameGame / 1000);
                    this.rect.position.x += this.speed * 0.01 * f.Loop.timeFrameGame / 1000;
                }
            }
        }
        move(_speed) {
            if (this.bunState == BUNSTATE.MOVING) {
                this.constructCollisionRect(new f.Vector2(2, 3), [45, 60, 45, 20]);
                this.mtxLocal.translateX(_speed * f.Loop.timeFrameGame / 1000);
                this.rect.position.x = this.mtxLocal.translation.x - this.rect.size.x / 2;
                this.rect.position.y = this.mtxLocal.translation.y + this.rect.size.y / 2;
            }
        }
    }
    EndabgabePrototyp.HotDogBun = HotDogBun;
})(EndabgabePrototyp || (EndabgabePrototyp = {}));
var EndabgabePrototyp;
(function (EndabgabePrototyp) {
    var f = FudgeCore;
    class HotDogWithSauce extends EndabgabePrototyp.GameObject {
        constructor(_name, _position, _size) {
            super(_name, _position, _size);
            this.numberOfPicklesOnHotDog = 0;
            let txtHotDog = new f.TextureImage("../assets/hotDogWithSauce.png");
            let mtrHotDog = new f.Material("Sausage", f.ShaderTexture, new f.CoatTextured(f.Color.CSS("WHITE"), txtHotDog));
            let cmpMaterial = new f.ComponentMaterial(mtrHotDog);
            cmpMaterial.pivot.scale(f.Vector2.ONE(1));
            this.addComponent(cmpMaterial);
        }
        updateHotDogWithSauce() {
            this.constructCollisionRect(new f.Vector2(2, 2), [20, 10, 20, 50]);
            if (this.numberOfPicklesOnHotDog >= EndabgabePrototyp.currentDifficultyValues.numberOfPicklesNeeded) {
                EndabgabePrototyp.sceneBuilder1.gameState = EndabgabePrototyp.GAMESTATE.PAUSE;
                setTimeout(function () { EndabgabePrototyp.sceneBuilder1.gameState = EndabgabePrototyp.GAMESTATE.PLAY; }, 3000);
                EndabgabePrototyp.sceneBuilder1.levelStatus = EndabgabePrototyp.Level.NEXTLEVEL;
            }
        }
    }
    EndabgabePrototyp.HotDogWithSauce = HotDogWithSauce;
})(EndabgabePrototyp || (EndabgabePrototyp = {}));
var EndabgabePrototyp;
(function (EndabgabePrototyp) {
    var f = FudgeCore;
    window.addEventListener("load", hndLoad);
    async function hndLoad() {
        EndabgabePrototyp.canvas = document.querySelector("canvas");
        EndabgabePrototyp.root = new f.Node("Root");
        EndabgabePrototyp.sceneBuilder1 = EndabgabePrototyp.SceneBuilder.getInstance();
        EndabgabePrototyp.cmpCamera = new f.ComponentCamera();
        EndabgabePrototyp.cmpCamera.pivot.translateZ(40);
        EndabgabePrototyp.cmpCamera.pivot.rotateY(180);
        EndabgabePrototyp.viewport = new f.Viewport();
        EndabgabePrototyp.viewport.initialize("Viewport", EndabgabePrototyp.root, EndabgabePrototyp.cmpCamera, EndabgabePrototyp.canvas);
        EndabgabePrototyp.crc2 = EndabgabePrototyp.canvas.getContext("2d");
        await EndabgabePrototyp.hndJson("../data/difficulty.json");
        EndabgabePrototyp.sceneBuilder1.readyCurrentLevel(EndabgabePrototyp.Level.MENU);
        EndabgabePrototyp.sceneBuilder1.gameState = EndabgabePrototyp.GAMESTATE.PLAY;
        f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, hndLoop);
        f.Loop.start(f.LOOP_MODE.TIME_GAME, 60);
    }
    function hndLoop() {
        if (EndabgabePrototyp.sceneBuilder1.gameState == EndabgabePrototyp.GAMESTATE.PAUSE) {
            EndabgabePrototyp.viewport.draw();
            return;
        }
        EndabgabePrototyp.viewport.draw();
        EndabgabePrototyp.sceneBuilder1.hndCurrentLvl();
    }
})(EndabgabePrototyp || (EndabgabePrototyp = {}));
var EndabgabePrototyp;
(function (EndabgabePrototyp) {
    var f = FudgeCore;
    class Pickle extends EndabgabePrototyp.GameObject {
        constructor(_name, _position, _size) {
            super(_name, _position, _size);
            this.pickleShootingMovementY = 10;
            let txtPickle = new f.TextureImage("../assets/pickle.png");
            let mtrPickle = new f.Material("Pickle", f.ShaderTexture, new f.CoatTextured(f.Color.CSS("WHITE"), txtPickle));
            let cmpMaterial = new f.ComponentMaterial(mtrPickle);
            cmpMaterial.pivot.scale(f.Vector2.ONE(1));
            this.addComponent(cmpMaterial);
            this.startingPosition = this.mtxWorld.translation;
        }
        move(_pickleSpeed) {
            this.constructCollisionRect(new f.Vector2(2, 2), [10, 20, 10, 5]);
            this.pickleShootingMovementY += -0.1;
            this.mtxLocal.translateY(this.pickleShootingMovementY * f.Loop.timeFrameGame / 1000);
            this.mtxLocal.translateX((-0.5) * _pickleSpeed * f.Loop.timeFrameGame / 1000);
            this.rect.position.x = this.mtxWorld.translation.x - this.rect.size.x / 2;
            this.rect.position.y = this.mtxWorld.translation.y - this.rect.size.y / 2;
        }
        hndHotDogCollision(_hotDog) {
            let intersection = this.rect2.getIntersection(_hotDog.rect2);
            if (intersection == null)
                return false;
            if (intersection != null) {
                EndabgabePrototyp.sceneBuilder1.playAudio("../sounds/pickleLanding.mp3", 1, false);
                _hotDog.numberOfPicklesOnHotDog++;
                return true;
            }
            return false;
        }
        hndDistance() {
            let distance = this.mtxWorld.translation.y - this.startingPosition.y;
            return distance;
        }
    }
    EndabgabePrototyp.Pickle = Pickle;
})(EndabgabePrototyp || (EndabgabePrototyp = {}));
var EndabgabePrototyp;
(function (EndabgabePrototyp) {
    var f = FudgeCore;
    let JOB;
    (function (JOB) {
        JOB[JOB["WAIT"] = 0] = "WAIT";
        JOB[JOB["SHOOT"] = 1] = "SHOOT";
        JOB[JOB["RELOAD"] = 2] = "RELOAD";
        JOB[JOB["EMPTY"] = 3] = "EMPTY";
    })(JOB || (JOB = {}));
    class PickleJar extends EndabgabePrototyp.GameObject {
        constructor(_name, _position, _size) {
            super(_name, _position, _size);
            this.numberOfPickles = EndabgabePrototyp.currentDifficultyValues.numberOfPickles;
            this.job = JOB.RELOAD;
            this.ctrMovement = new f.Control("PickleSpeed", 0.3, 0 /* PROPORTIONAL */);
            let txtPickleJar = new f.TextureImage("../assets/pickleJar.png");
            let mtrPickleJar = new f.Material("PickleJar", f.ShaderTexture, new f.CoatTextured(f.Color.CSS("WHITE"), txtPickleJar));
            let cmpMaterial = new f.ComponentMaterial(mtrPickleJar);
            cmpMaterial.pivot.scale(f.Vector2.ONE(1));
            this.addComponent(cmpMaterial);
        }
        updatePickleJar() {
            let displayNumberOfPickles = document.getElementById("numberOfItems");
            switch (this.job) {
                case JOB.RELOAD:
                    if (this.numberOfPickles > 0) {
                        this.buildPickle();
                        console.log("Ready to Shoot...");
                        this.pickleSpeed = 0;
                        this.job = JOB.WAIT;
                    }
                    else {
                        this.job = JOB.EMPTY;
                    }
                    break;
                case JOB.WAIT:
                    //console.log("waiting...");
                    //this.ctrMovement.setDelay(100);
                    this.ctrMovement.setInput(f.Keyboard.mapToValue(-1, 0, [f.KEYBOARD_CODE.A, f.KEYBOARD_CODE.ARROW_LEFT])
                        + f.Keyboard.mapToValue(1, 0, [f.KEYBOARD_CODE.D, f.KEYBOARD_CODE.ARROW_RIGHT]));
                    displayNumberOfPickles.innerHTML = this.numberOfPickles.toString();
                    if (this.ctrMovement.getOutput() > 0) {
                        this.pickleSpeed += this.ctrMovement.getOutput();
                        console.log(this.pickleSpeed);
                    }
                    else if (this.ctrMovement.getOutput() < 0) {
                        EndabgabePrototyp.sceneBuilder1.playAudio("../sounds/shootPickle.mp3", 1, false);
                        this.job = JOB.SHOOT;
                    }
                    else if (this.ctrMovement.getOutput() == 0)
                        break;
                    break;
                case JOB.SHOOT:
                    console.log("shoot");
                    this.currentPickle.move(this.pickleSpeed);
                    if (this.currentPickle.hndHotDogCollision(EndabgabePrototyp.hotDogWithSauceOne) == true) {
                        console.log("getroffen");
                        this.currentPickle.mtxLocal.rotateZ(-45);
                        this.currentPickle.mtxLocal.translateY(-1);
                        this.job = JOB.RELOAD;
                        this.numberOfPickles -= 1;
                    }
                    if (this.currentPickle.mtxLocal.translation.y <= -10) {
                        this.removeChild(this.currentPickle);
                        this.job = JOB.RELOAD;
                        this.numberOfPickles -= 1;
                    }
                    break;
                case JOB.EMPTY:
                    this.currentPickle = null;
                    displayNumberOfPickles.innerHTML = "Game Over";
                    EndabgabePrototyp.sceneBuilder1.levelStatus = EndabgabePrototyp.Level.NEXTLEVEL;
                    //this.pauseSausageShooter(sausageShooterOne);
                    break;
            }
        }
        buildPickle() {
            let pickleNumber = this.numberOfPickles;
            let pickleName = "pickle" + `${pickleNumber}`;
            let positionpickle = new f.Vector3(-0.2, 5.5, 1);
            let sizepickle = new f.Vector2(2, 2.2);
            let pickle = new EndabgabePrototyp.Pickle(pickleName, positionpickle, sizepickle);
            this.currentPickle = pickle;
            this.appendChild(pickle);
        }
    }
    EndabgabePrototyp.PickleJar = PickleJar;
})(EndabgabePrototyp || (EndabgabePrototyp = {}));
var EndabgabePrototyp;
(function (EndabgabePrototyp) {
    var f = FudgeCore;
    class Sauce extends EndabgabePrototyp.GameObject {
        constructor(_name, _position, _size) {
            super(_name, _position, _size);
            this.speed = -5;
            let txtSauce = new f.TextureImage("../assets/sauce.png");
            let mtrSauce = new f.Material("Sausage", f.ShaderTexture, new f.CoatTextured(f.Color.CSS("WHITE"), txtSauce));
            let cmpMaterial = new f.ComponentMaterial(mtrSauce);
            cmpMaterial.pivot.scale(f.Vector2.ONE(1));
            this.addComponent(cmpMaterial);
        }
        move() {
            this.mtxLocal.translateY(this.speed * f.Loop.timeFrameGame / 1000);
            this.constructCollisionRect(new f.Vector2(0, 0), [0, 0, 0, 0]);
        }
        hndBunCollision(_bun) {
            let intersection = this.rect2.getIntersection(_bun.rect2);
            if (intersection != null) {
                this.changeSauceSize();
                return true;
            }
            return false;
        }
        changeSauceSize() {
            this.cmpTransform.local.scaleY(0.95);
            this.speed -= this.speed * -0.05;
        }
    }
    EndabgabePrototyp.Sauce = Sauce;
})(EndabgabePrototyp || (EndabgabePrototyp = {}));
var EndabgabePrototyp;
(function (EndabgabePrototyp) {
    var f = FudgeCore;
    let JOB;
    (function (JOB) {
        JOB[JOB["WAIT"] = 0] = "WAIT";
        JOB[JOB["SHOOT"] = 1] = "SHOOT";
        JOB[JOB["RELOAD"] = 2] = "RELOAD";
        JOB[JOB["EMPTY"] = 3] = "EMPTY";
    })(JOB || (JOB = {}));
    class SauceContainer extends EndabgabePrototyp.GameObject {
        constructor(_name, _position, _size) {
            super(_name, _position, _size);
            this.numberOfSauceLoads = EndabgabePrototyp.currentDifficultyValues.numberOfSauceLoads;
            this.job = JOB.RELOAD;
            let txtSauceContainer = new f.TextureImage("../assets/sauceContainer.png");
            let mtrSauceContainer = new f.Material("Saucecontainer", f.ShaderTexture, new f.CoatTextured(f.Color.CSS("WHITE"), txtSauceContainer));
            let cmpMaterial = new f.ComponentMaterial(mtrSauceContainer);
            cmpMaterial.pivot.scale(f.Vector2.ONE(1));
            this.addComponent(cmpMaterial);
        }
        updateSaucecontainer() {
            switch (this.job) {
                case JOB.RELOAD:
                    if (this.numberOfSauceLoads > 0) {
                        this.buildSauce();
                        this.job = JOB.WAIT;
                    }
                    else {
                        this.job = JOB.EMPTY;
                    }
                    break;
                case JOB.WAIT:
                    let randomeNumber = Math.floor(Math.random() * (100 - 0) + 0);
                    if (randomeNumber == 5) {
                        EndabgabePrototyp.sceneBuilder1.playAudio("../sounds/shootSauce.mp3", 1, false);
                        this.job = JOB.SHOOT;
                    }
                    break;
                case JOB.SHOOT:
                    this.currentSauceLoad.move();
                    if (this.currentSauceLoad.hndBunCollision(EndabgabePrototyp.hotDogOne) == true) {
                        EndabgabePrototyp.hotDogOne.numberOfSauceLoadsOnHotDog += 0.5;
                    }
                    if (this.currentSauceLoad.mtxLocal.translation.y <= -18 || this.currentSauceLoad.cmpTransform.local.scaling.y < 0.2) {
                        this.removeChild(this.currentSauceLoad);
                        this.job = JOB.RELOAD;
                        this.numberOfSauceLoads -= 1;
                    }
                    break;
                case JOB.EMPTY:
                    this.currentSauceLoad = null;
                    break;
            }
        }
        buildSauce() {
            let sauceNumber = this.numberOfSauceLoads;
            let sauceName = "sauce" + `${sauceNumber}`;
            let positionSauce = new f.Vector3(0, 0, 0);
            let sizeSauce = new f.Vector2(0.5, 5);
            let sauce = new EndabgabePrototyp.Sauce(sauceName, positionSauce, sizeSauce);
            this.currentSauceLoad = sauce;
            this.appendChild(sauce);
        }
    }
    EndabgabePrototyp.SauceContainer = SauceContainer;
})(EndabgabePrototyp || (EndabgabePrototyp = {}));
var EndabgabePrototyp;
(function (EndabgabePrototyp) {
    var f = FudgeCore;
    class Sausage extends EndabgabePrototyp.GameObject {
        constructor(_name, _position, _size) {
            super(_name, _position, _size);
            this.speed = 5;
            this.rect = new f.Rectangle(_position.x, _position.y, _size.x / 2, _size.y, f.ORIGIN2D.CENTER);
            let txtSausage = new f.TextureImage("../assets/sausage.png");
            let mtrSausage = new f.Material("Sausage", f.ShaderTexture, new f.CoatTextured(f.Color.CSS("WHITE"), txtSausage));
            let cmpMaterial = new f.ComponentMaterial(mtrSausage);
            cmpMaterial.pivot.scale(f.Vector2.ONE(1));
            this.addComponent(cmpMaterial);
        }
        move() {
            this.constructCollisionRect(new f.Vector2(2, 3), [20, 0, 20, 60]);
            this.mtxLocal.translateY(this.speed * f.Loop.timeFrameGame / 1000);
            this.rect.position.x = this.mtxLocal.translation.x - this.rect.size.x / 2;
            this.rect.position.y = this.mtxLocal.translation.y - this.rect.size.y;
        }
        hndBunCollision(_bun) {
            let intersection = this.rect2.getIntersection(_bun.rect2);
            if (intersection != null) {
                EndabgabePrototyp.hotDogBunOne.bunState = EndabgabePrototyp.BUNSTATE.WAITING;
            }
        }
    }
    EndabgabePrototyp.Sausage = Sausage;
})(EndabgabePrototyp || (EndabgabePrototyp = {}));
var EndabgabePrototyp;
(function (EndabgabePrototyp) {
    var f = FudgeCore;
    let JOB;
    (function (JOB) {
        JOB[JOB["WAIT"] = 0] = "WAIT";
        JOB[JOB["SHOOT"] = 1] = "SHOOT";
        JOB[JOB["RELOAD"] = 2] = "RELOAD";
        JOB[JOB["EMPTY"] = 3] = "EMPTY";
    })(JOB || (JOB = {}));
    class SausageShooter9000 extends EndabgabePrototyp.GameObject {
        constructor(_name, _position, _size) {
            super(_name, _position, _size);
            this._numberOfSausages = EndabgabePrototyp.currentDifficultyValues.numberOfSausages;
            this.job = JOB.RELOAD;
            let txtSausage = new f.TextureImage("../assets/sausageShooter9000.png");
            let mtrSausage = new f.Material("SausageShooter9000", f.ShaderTexture, new f.CoatTextured(f.Color.CSS("WHITE"), txtSausage));
            let cmpMaterial = new f.ComponentMaterial(mtrSausage);
            cmpMaterial.pivot.scale(f.Vector2.ONE(1));
            this.addComponent(cmpMaterial);
        }
        get numberOfSausages() {
            return this._numberOfSausages;
        }
        set numberOfSausages(value) {
            this._numberOfSausages = value;
        }
        get currentSausage() {
            return this._currentSausage;
        }
        set currentSausage(value) {
            this._currentSausage = value;
        }
        readySausageShooter(_sausageShooter) {
            EndabgabePrototyp.canvas.addEventListener("mousedown", _sausageShooter.hndShoot);
        }
        updateSausageShooter9000() {
            let displayNumberOfSausages = document.getElementById("numberOfItems");
            switch (this.job) {
                case JOB.RELOAD:
                    if (this._numberOfSausages > 0) {
                        this.buildSausage();
                        this.job = JOB.WAIT;
                    }
                    else {
                        this.job = JOB.EMPTY;
                        EndabgabePrototyp.sceneBuilder1.levelStatus = EndabgabePrototyp.Level.GAMEOVER;
                        EndabgabePrototyp.sceneBuilder1.readyCurrentLevel(EndabgabePrototyp.Level.GAMEOVER);
                    }
                    break;
                case JOB.WAIT:
                    displayNumberOfSausages.innerHTML = this._numberOfSausages.toString();
                    break;
                case JOB.SHOOT:
                    this._currentSausage.move();
                    this._currentSausage.hndBunCollision(EndabgabePrototyp.hotDogBunOne);
                    if (this._currentSausage.mtxLocal.translation.y >= 17 && EndabgabePrototyp.hotDogBunOne.bunState == EndabgabePrototyp.BUNSTATE.WAITING) {
                        EndabgabePrototyp.sceneBuilder1.levelStatus = EndabgabePrototyp.Level.NEXTLEVEL;
                    }
                    else if (this._currentSausage.mtxLocal.translation.y >= 18) {
                        this.removeChild(this._currentSausage);
                        this.job = JOB.RELOAD;
                        this._numberOfSausages -= 1;
                    }
                    break;
                case JOB.EMPTY:
                    displayNumberOfSausages.innerHTML = "Game Over";
                    this.currentSausage = null;
                    this.pauseSausageShooter(EndabgabePrototyp.sausageShooterOne);
                    break;
            }
        }
        pauseSausageShooter(_sausageShooter) {
            EndabgabePrototyp.canvas.removeEventListener("mousedown", _sausageShooter.hndShoot);
            let displayNumberOfSausages = document.getElementById("numberOfItems");
            displayNumberOfSausages.innerHTML = "";
        }
        hndShoot() {
            EndabgabePrototyp.sausageShooterOne.job = JOB.SHOOT;
            EndabgabePrototyp.sceneBuilder1.playAudio("../sounds/shootSausage.mp3", 1, false);
        }
        buildSausage() {
            let sausageNumber = this.numberOfSausages;
            let sausageName = "Sausage" + `${sausageNumber}`;
            let positionSausage = new f.Vector3(1.75, 0, -1);
            let sizeSausage = new f.Vector2(1, 5);
            let sausage = new EndabgabePrototyp.Sausage(sausageName, positionSausage, sizeSausage);
            this.currentSausage = sausage;
            this.appendChild(sausage);
        }
    }
    EndabgabePrototyp.SausageShooter9000 = SausageShooter9000;
})(EndabgabePrototyp || (EndabgabePrototyp = {}));
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
    let GAMESTATE;
    (function (GAMESTATE) {
        GAMESTATE[GAMESTATE["PLAY"] = 0] = "PLAY";
        GAMESTATE[GAMESTATE["PAUSE"] = 1] = "PAUSE";
    })(GAMESTATE = EndabgabePrototyp.GAMESTATE || (EndabgabePrototyp.GAMESTATE = {}));
    class SceneBuilder {
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
            return audio;
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
        readyCurrentLevel(_level) {
            this.itemNameDiv = document.getElementById("currentItem");
            this.itemNumberDiv = document.getElementById("numberOfItems");
            switch (_level) {
                case _level = Level.MENU: {
                    EndabgabePrototyp.root.removeAllChildren();
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
                    EndabgabePrototyp.root.removeAllChildren();
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
                if (EndabgabePrototyp.difficultyList[i].name == _difficulty) {
                    EndabgabePrototyp.currentDifficultyValues = EndabgabePrototyp.difficultyList[i];
                    console.log(EndabgabePrototyp.difficultyList[i].name);
                    break;
                }
            }
            this.playAudio("../sounds/letsGo.mp3", 1, false);
            EndabgabePrototyp.sceneBuilder1.readyCurrentLevel(Level.ONE);
        }
        removeDifficultySettings() {
            let buttonDiv = document.getElementById("difficultyDiv");
            buttonDiv.innerHTML = "";
        }
        makeSettingsVisible() {
            this.volumeDiv = document.getElementById("volumeDiv");
            this.volumeDiv.style.visibility = "visible";
            this.homeButton = document.getElementById("homePic");
            this.homeButton.style.visibility = "visible";
            this.volumeSlider = document.getElementById("volumeSlider");
            this.volumeSlider.addEventListener("change", this.hndVolumeAdjustment);
        }
        hideSettings() {
            this.volumeDiv.style.visibility = "hidden";
            this.homeButton.style.visibility = "hidden";
        }
        hndVolumeAdjustment() {
            EndabgabePrototyp.sceneBuilder1.backgroundMusic.volume = Number(EndabgabePrototyp.sceneBuilder1.volumeSlider.value);
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
            let background = new faid.Node("Background", f.Matrix4x4.ROTATION_X(0), mtrBackground, meshQuad);
            background.mtxLocal.scale(f.Vector3.ONE(30));
            background.mtxLocal.scaleX(10);
            background.mtxLocal.translateX(-0.3);
            EndabgabePrototyp.root.appendChild(background);
        }
        buildWalls(_left, _right, _depth) {
            let wallLeft = new EndabgabePrototyp.Wall("wallLeft", new f.Vector3(_left, 0, _depth), new f.Vector2(1, 30));
            let wallRight = new EndabgabePrototyp.Wall("wallRight", new f.Vector3(_right, 0, _depth), new f.Vector2(1, 30));
            this.walls = new f.Node("Walls");
            this.walls.addChild(wallLeft);
            this.walls.addChild(wallRight);
            console.log(this.walls);
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
        }
        buildSausageShooter9000() {
            let positionSausageShooter9000 = new f.Vector3(-4, -7, 5);
            let sizeSausageShooter9000 = new f.Vector2(15, 8);
            EndabgabePrototyp.sausageShooterOne = new EndabgabePrototyp.SausageShooter9000("sausageshooter90001", positionSausageShooter9000, sizeSausageShooter9000);
            EndabgabePrototyp.sausageShooterOne.mtxLocal.scaleX(2);
            EndabgabePrototyp.root.appendChild(EndabgabePrototyp.sausageShooterOne);
            EndabgabePrototyp.sausageShooterOne.readySausageShooter(EndabgabePrototyp.sausageShooterOne);
        }
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
        }
        buildLevel3() {
            this.buildPickleJar();
            this.buildHotDogWithSauce();
        }
        buildPickleJar() {
            let positionPickleJar = new f.Vector3(8, -6, 5);
            EndabgabePrototyp.pickleJarOne = new EndabgabePrototyp.PickleJar("pickleJarOne", positionPickleJar, new f.Vector2(6, 8));
            EndabgabePrototyp.root.appendChild(EndabgabePrototyp.pickleJarOne);
        }
        buildHotDogWithSauce() {
            let positionHotDogWithSauce = new f.Vector3(-6, -8, 5);
            EndabgabePrototyp.hotDogWithSauceOne = new EndabgabePrototyp.HotDogWithSauce("HotDogWithSauceOne", positionHotDogWithSauce, new f.Vector2(9, 3));
            EndabgabePrototyp.root.appendChild(EndabgabePrototyp.hotDogWithSauceOne);
        }
        buildFinishScreen() {
            this.hideSettings();
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
            this.hideSettings();
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
var EndabgabePrototyp;
(function (EndabgabePrototyp) {
    var f = FudgeCore;
    class Wall extends EndabgabePrototyp.GameObject {
        constructor(_name, _position, _size) {
            super(_name, _position, _size);
            let cmpMaterial = new f.ComponentMaterial(Wall.mtrSolidWGray);
            this.addComponent(cmpMaterial);
        }
    }
    Wall.mtrSolidWGray = new f.Material("Gray", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("GRAY")));
    EndabgabePrototyp.Wall = Wall;
})(EndabgabePrototyp || (EndabgabePrototyp = {}));
//# sourceMappingURL=MainMaster.js.map