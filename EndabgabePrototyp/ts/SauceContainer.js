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
        /* public get numberOfSausages(): number {
            return this._numberOfSausages;
        }
        public set numberOfSausages(value: number) {
            this._numberOfSausages = value;
        }

        public get currentSausage(): Sausage {
            return this._currentSausage;
        }
        public set currentSausage(value: Sausage) {
            this._currentSausage = value;
        } */
        buildSauce() {
            let sauceNumber = this.numberOfSauceLoads;
            let sauceName = "sauce" + `${sauceNumber}`;
            let positionSauce = new f.Vector3(0, 0, 0);
            let sizeSauce = new f.Vector2(0.5, 5);
            let sauce = new EndabgabePrototyp.Sauce(sauceName, positionSauce, sizeSauce);
            this.currentSauceLoad = sauce;
            //currentSausage = sausage;
            this.appendChild(sauce);
            /* sauce.rect.position.x = sauce.mtxWorld.translation.x;
            sauce.rect.position.y = sauce.mtxWorld.translation.y; */
        }
        updateSaucecontainer() {
            switch (this.job) {
                case JOB.RELOAD:
                    if (this.numberOfSauceLoads > 0) {
                        this.buildSauce();
                        //console.log("Ready to Shoot...");
                        this.job = JOB.WAIT;
                    }
                    else {
                        this.job = JOB.EMPTY;
                    }
                    break;
                case JOB.WAIT:
                    //console.log("waiting...");
                    let randomeNumber = Math.floor(Math.random() * (100 - 0) + 0);
                    if (randomeNumber == 5) {
                        EndabgabePrototyp.sceneBuilder1.playAudio("../sounds/shootSauce.mp3", 1, false);
                        this.job = JOB.SHOOT;
                    }
                    break;
                case JOB.SHOOT:
                    //console.log("shoot");
                    this.currentSauceLoad.move();
                    if (this.currentSauceLoad.hndBunCollision(EndabgabePrototyp.hotDogOne) == true) {
                        EndabgabePrototyp.hotDogOne.numberOfSauceLoadsOnTheHotDog += 0.5;
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
    }
    EndabgabePrototyp.SauceContainer = SauceContainer;
})(EndabgabePrototyp || (EndabgabePrototyp = {}));
//# sourceMappingURL=SauceContainer.js.map