namespace EndabgabePrototyp {
    import f = FudgeCore;

    enum JOB {
        WAIT, SHOOT, RELOAD, EMPTY
    }
    
    export class SausageShooter9000 extends GameObject {

        private _numberOfSausages: number = currentDifficultyValues.numberOfSausages;
        private _currentSausage: Sausage;
        private job: JOB = JOB.RELOAD;
        

        public constructor(_name: string, _position: f.Vector3, _size: f.Vector2) {
            super(_name, _position, _size);

            let txtSausage: f.TextureImage = new f.TextureImage("../assets/sausageShooter9000.png");
            let mtrSausage: f.Material = new f.Material("SausageShooter9000", f.ShaderTexture, new f.CoatTextured(f.Color.CSS("WHITE"), txtSausage));

            let cmpMaterial: f.ComponentMaterial = new f.ComponentMaterial(mtrSausage);
            cmpMaterial.pivot.scale(f.Vector2.ONE(1));
            this.addComponent(cmpMaterial);
            
        }

        public get numberOfSausages(): number {
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
        }

        public buildSausage(): void {
            let sausageNumber: number = this.numberOfSausages;
            let sausageName: string = "Sausage" + `${sausageNumber}`;
            let positionSausage: f.Vector3 = new f.Vector3(1.75, 0, -1);
            let sizeSausage: f.Vector2 = new f.Vector2(0.9, 5);

            let sausage: Sausage = new Sausage(sausageName, positionSausage, sizeSausage);
            this.currentSausage = sausage;
            //currentSausage = sausage;
            this.appendChild(sausage);
        }

        public readySausageShooter(_sausageShooter: SausageShooter9000): void {
            canvas.addEventListener("mousedown", _sausageShooter.hndShoot);
        }

        

        public hndShoot(): void {
            sausageShooterOne.job = JOB.SHOOT;
            sceneBuilder1.playAudio("../sounds/shootSausage.mp3", 1, false);

        }

        /* public readySausageShooter(_sausageShooter: SausageShooter9000): void {
            canvas.addEventListener("mousedown", function(): void {_sausageShooter.shootSausage(); } );
        } */

        /* public shootSausage(): void {
            
            this.currentSausage.hndShoot();
        } */

        public updateSausageShooter9000(): void {

            let displayNumberOfSausages: HTMLElement = <HTMLElement>document.getElementById("numberOfItems");
            


            switch (this.job) {
                case JOB.RELOAD:
                    if (this._numberOfSausages > 0) {
                        this.buildSausage();
                        console.log("Ready to Shoot...");
                        this.job = JOB.WAIT;
                    } else {
                        this.job = JOB.EMPTY;
                        sceneBuilder1.levelStatus = Level.GAMEOVER;
                        sceneBuilder1.readyCurrentLevel(Level.GAMEOVER);
                    }
                    break;
                case JOB.WAIT:

                    displayNumberOfSausages.innerHTML = this._numberOfSausages.toString();
                    break;
                case JOB.SHOOT:
                    console.log("shooting...");
                    this._currentSausage.move();
                    this._currentSausage.hndBunCollision(hotDogBunOne);
                    if (this._currentSausage.mtxLocal.translation.y >= 17 && hotDogBunOne.bunState == BUNSTATE.WAITING) {
                        sceneBuilder1.levelStatus = Level.NEXTLEVEL;
                    } else if (this._currentSausage.mtxLocal.translation.y >= 18) {
                        this.removeChild(this._currentSausage);
                        this.job = JOB.RELOAD;
                        this._numberOfSausages -= 1;
                    }

                    
                    
                    break;
                case JOB.EMPTY:
                    displayNumberOfSausages.innerHTML = "Game Over";
                    this.currentSausage = null;
                    this.pauseSausageShooter(sausageShooterOne);
                    break;
            }
            
            
            
        }

        public pauseSausageShooter(_sausageShooter: SausageShooter9000): void {
            canvas.removeEventListener("mousedown", _sausageShooter.hndShoot);
            let displayNumberOfSausages: HTMLElement = <HTMLElement>document.getElementById("numberOfItems");
            displayNumberOfSausages.innerHTML = "";
        }
    }
}