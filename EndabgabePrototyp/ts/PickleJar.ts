namespace EndabgabePrototyp {
    import f = FudgeCore;

    enum JOB {
        WAIT, SHOOT, RELOAD, EMPTY
    }
    
    export class PickleJar extends GameObject {

        private numberOfPickles: number = currentDifficultyValues.numberOfPickles;
        private currentPickle: Pickle;
        private job: JOB = JOB.RELOAD;
        private ctrMovement: f.Control = new f.Control("PickleSpeed", 0.3, f.CONTROL_TYPE.PROPORTIONAL);
        private pickleSpeed: number;
        

        public constructor(_name: string, _position: f.Vector3, _size: f.Vector2) {
            super(_name, _position, _size);

            let txtPickleJar: f.TextureImage = new f.TextureImage("../assets/pickleJar.png");
            let mtrPickleJar: f.Material = new f.Material("PickleJar", f.ShaderTexture, new f.CoatTextured(f.Color.CSS("WHITE"), txtPickleJar));

            let cmpMaterial: f.ComponentMaterial = new f.ComponentMaterial(mtrPickleJar);
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

        public buildPickle(): void {
            let pickleNumber: number = this.numberOfPickles;
            let pickleName: string = "pickle" + `${pickleNumber}`;
            let positionpickle: f.Vector3 = new f.Vector3(-0.2, 5.5, 1);
            let sizepickle: f.Vector2 = new f.Vector2(2, 2.2);

            let pickle: Pickle = new Pickle(pickleName, positionpickle, sizepickle);
            this.currentPickle = pickle;
            this.appendChild(pickle);

        }


        public updatePickleJar(): void {

            let displayNumberOfPickles: HTMLElement = <HTMLElement>document.getElementById("numberOfItems");


            switch (this.job) {
                case JOB.RELOAD:
                    if (this.numberOfPickles > 0) {
                        this.buildPickle();
                        console.log("Ready to Shoot...");
                        this.pickleSpeed = 0;
                        this.job = JOB.WAIT;
                    } else {
                        this.job = JOB.EMPTY;
                    }
                    break;
                case JOB.WAIT:
                    //console.log("waiting...");
                    //this.ctrMovement.setDelay(100);
                    this.ctrMovement.setInput(
                    f.Keyboard.mapToValue(-1, 0, [f.KEYBOARD_CODE.S, f.KEYBOARD_CODE.ARROW_LEFT])
                    + f.Keyboard.mapToValue(1, 0, [f.KEYBOARD_CODE.W, f.KEYBOARD_CODE.ARROW_RIGHT])
                    );

                    displayNumberOfPickles.innerHTML = this.numberOfPickles.toString();
                    
                    if (this.ctrMovement.getOutput() > 0) {
                        this.pickleSpeed += this.ctrMovement.getOutput();
                        console.log(this.pickleSpeed);
                    }
                    else if (this.ctrMovement.getOutput() < 0) {
                        this.job = JOB.SHOOT;
                    }
                    else if (this.ctrMovement.getOutput() == 0)
                    break;
                    
                    break;
                case JOB.SHOOT:
                    console.log("shoot");
                    this.currentPickle.move(this.pickleSpeed);
                    
                    if (this.currentPickle.hndHotDogCollision(hotDogWithSauceOne) == true) {
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
                    sceneBuilder1.levelStatus = Level.NEXTLEVEL;
                    //this.pauseSausageShooter(sausageShooterOne);
                    break;
            }

            
            
        }

        /* public pauseSausageShooter(_sausageShooter: SausageShooter9000): void {
            canvas.removeEventListener("mousedown", _sausageShooter.hndShoot);
            let displayNumberOfSausages: HTMLElement = <HTMLElement>document.getElementById("numberOfItems");
            displayNumberOfSausages.innerHTML = "";
        } */
    }
}