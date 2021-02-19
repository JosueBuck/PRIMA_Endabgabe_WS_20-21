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
        buildSausage() {
            let sausageNumber = this.numberOfSausages;
            let sausageName = "Sausage" + `${sausageNumber}`;
            let positionSausage = new f.Vector3(1.75, 0, -1);
            let sizeSausage = new f.Vector2(0.9, 5);
            let sausage = new EndabgabePrototyp.Sausage(sausageName, positionSausage, sizeSausage);
            this.currentSausage = sausage;
            //currentSausage = sausage;
            this.appendChild(sausage);
        }
        readySausageShooter(_sausageShooter) {
            EndabgabePrototyp.canvas.addEventListener("mousedown", _sausageShooter.hndShoot);
        }
        hndShoot() {
            EndabgabePrototyp.sausageShooterOne.job = JOB.SHOOT;
            EndabgabePrototyp.sceneBuilder1.playAudio("../sounds/shootSausage.mp3", 1, false);
            console.log(this);
            console.log("now shooting...");
            console.log(EndabgabePrototyp.sausageShooterOne.currentSausage.name);
        }
        /* public readySausageShooter(_sausageShooter: SausageShooter9000): void {
            canvas.addEventListener("mousedown", function(): void {_sausageShooter.shootSausage(); } );
        } */
        /* public shootSausage(): void {
            
            this.currentSausage.hndShoot();
        } */
        updateSausageShooter9000() {
            let displayNumberOfSausages = document.getElementById("numberOfItems");
            switch (this.job) {
                case JOB.RELOAD:
                    if (this._numberOfSausages > 0) {
                        this.buildSausage();
                        console.log("Ready to Shoot...");
                        this.job = JOB.WAIT;
                    }
                    else {
                        this.job = JOB.EMPTY;
                        EndabgabePrototyp.sceneBuilder1.levelStatus = EndabgabePrototyp.Level.GAMEOVER;
                        EndabgabePrototyp.sceneBuilder1.readyCurrentLevel(EndabgabePrototyp.Level.GAMEOVER);
                    }
                    break;
                case JOB.WAIT:
                    console.log("waiting...");
                    displayNumberOfSausages.innerHTML = this._numberOfSausages.toString();
                    break;
                case JOB.SHOOT:
                    console.log("shooting...");
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
    }
    EndabgabePrototyp.SausageShooter9000 = SausageShooter9000;
})(EndabgabePrototyp || (EndabgabePrototyp = {}));
//# sourceMappingURL=SausageShooter9000.js.map