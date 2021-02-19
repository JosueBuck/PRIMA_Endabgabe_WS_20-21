"use strict";
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
        /* public readyPickleJar(_pickleJar: PickleJar): void {
            canvas.addEventListener("mousedown", _pickleJar.hndShoot);
        } */
        /* public hndShoot(): void {
            pickleJarOne.job = JOB.SHOOT;
            console.log(this);
            console.log("now shooting...");
            //console.log(sausageShooterOne.currentSausage.name);
        } */
        buildPickle() {
            let pickleNumber = this.numberOfPickles;
            let pickleName = "pickle" + `${pickleNumber}`;
            let positionpickle = new f.Vector3(-0.2, 5.5, 1);
            let sizepickle = new f.Vector2(2, 2.2);
            let pickle = new EndabgabePrototyp.Pickle(pickleName, positionpickle, sizepickle);
            this.currentPickle = pickle;
            this.appendChild(pickle);
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
                    this.ctrMovement.setInput(f.Keyboard.mapToValue(-1, 0, [f.KEYBOARD_CODE.S, f.KEYBOARD_CODE.ARROW_LEFT])
                        + f.Keyboard.mapToValue(1, 0, [f.KEYBOARD_CODE.W, f.KEYBOARD_CODE.ARROW_RIGHT]));
                    displayNumberOfPickles.innerHTML = this.numberOfPickles.toString();
                    if (this.ctrMovement.getOutput() > 0) {
                        this.pickleSpeed += this.ctrMovement.getOutput();
                        console.log(this.pickleSpeed);
                    }
                    else if (this.ctrMovement.getOutput() < 0) {
                        this.job = JOB.SHOOT;
                    }
                    else if (this.ctrMovement.getOutput() == 0)
                        console.log("waiting for input");
                    break;
                case JOB.SHOOT:
                    console.log("shoot");
                    this.currentPickle.move(this.pickleSpeed);
                    if (this.currentPickle.hndHotDogCollision(EndabgabePrototyp.hotDogWithSauceOne) == true) {
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
    }
    EndabgabePrototyp.PickleJar = PickleJar;
})(EndabgabePrototyp || (EndabgabePrototyp = {}));
//# sourceMappingURL=PickleJar.js.map