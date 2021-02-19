namespace EndabgabePrototyp {
    import f = FudgeCore;

    enum JOB {
        WAIT, SHOOT, RELOAD, EMPTY
    }
    
    export class SauceContainer extends GameObject {

        private numberOfSauceLoads: number = currentDifficultyValues.numberOfSauceLoads;
        private currentSauceLoad: Sauce;
        private job: JOB = JOB.RELOAD;
        
        

        public constructor(_name: string, _position: f.Vector3, _size: f.Vector2) {
            super(_name, _position, _size);

            let txtSauceContainer: f.TextureImage = new f.TextureImage("../assets/sauceContainer.png");
            let mtrSauceContainer: f.Material = new f.Material("Saucecontainer", f.ShaderTexture, new f.CoatTextured(f.Color.CSS("WHITE"), txtSauceContainer));

            let cmpMaterial: f.ComponentMaterial = new f.ComponentMaterial(mtrSauceContainer);
            cmpMaterial.pivot.scale(f.Vector2.ONE(1));
            this.addComponent(cmpMaterial);
            
        }

        public updateSaucecontainer(): void {

            switch (this.job) {
                case JOB.RELOAD:
                    if (this.numberOfSauceLoads > 0) {
                        this.buildSauce();
                        this.job = JOB.WAIT;
                    } else {
                        this.job = JOB.EMPTY;
                    }
                    break;
                case JOB.WAIT:
                    let randomeNumber: number = Math.floor(Math.random() * (100 - 0) + 0);
                    if (randomeNumber == 5) {
                        sceneBuilder1.playAudio("../sounds/shootSauce.mp3", 1, false);
                        this.job = JOB.SHOOT;
                    }
                        
                    
                    break;
                case JOB.SHOOT:
                    this.currentSauceLoad.move();
                    if (this.currentSauceLoad.hndBunCollision(hotDogOne) == true) {
                        hotDogOne.numberOfSauceLoadsOnHotDog += 0.5;
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

        private buildSauce(): void {
            let sauceNumber: number = this.numberOfSauceLoads;
            let sauceName: string = "sauce" + `${sauceNumber}`;
            let positionSauce: f.Vector3 = new f.Vector3(0, 0, 0);
            let sizeSauce: f.Vector2 = new f.Vector2(0.5, 5);

            let sauce: Sauce = new Sauce(sauceName, positionSauce, sizeSauce);
            this.currentSauceLoad = sauce;
            this.appendChild(sauce);
        }
    }
}