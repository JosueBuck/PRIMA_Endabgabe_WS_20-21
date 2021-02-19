namespace EndabgabePrototyp {
    import f = FudgeCore;

    
    
    export class Pickle extends GameObject {

        

        //private gravitiy: number = -5;
        private pickleShootingMovementY: number = 10;
        //private isPickleFalling: boolean = false;
        private startingPosition: f.Vector3;
        //private ctrMovement: ƒ.Control = new ƒ.Control("PickleFireMovementY", 0.3, ƒ.CONTROL_TYPE.PROPORTIONAL);

        public constructor(_name: string, _position: f.Vector3, _size: f.Vector2) {
            super(_name, _position, _size);

            let txtPickle: f.TextureImage = new f.TextureImage("../assets/pickle.png");
            let mtrPickle: f.Material = new f.Material("Pickle", f.ShaderTexture, new f.CoatTextured(f.Color.CSS("WHITE"), txtPickle));

            let cmpMaterial: f.ComponentMaterial = new f.ComponentMaterial(mtrPickle);
            cmpMaterial.pivot.scale(f.Vector2.ONE(1));
            this.addComponent(cmpMaterial);

            this.startingPosition = this.mtxWorld.translation;

            
            
        }

        public move(_pickleSpeed: number): void {
            this.constructCollisionRect(new f.Vector2(2, 2), [10, 20, 10, 5]);
            this.pickleShootingMovementY += -0.1;
            this.mtxLocal.translateY(this.pickleShootingMovementY * f.Loop.timeFrameGame / 1000);
            this.mtxLocal.translateX((-0.5) * _pickleSpeed * f.Loop.timeFrameGame / 1000);
            this.rect.position.x = this.mtxWorld.translation.x - this.rect.size.x / 2;
            this.rect.position.y = this.mtxWorld.translation.y - this.rect.size.y / 2;
        }


        public hndHotDogCollision(_hotDog: HotDogWithSauce): boolean {

            let intersection: f.Rectangle = this.rect2.getIntersection(_hotDog.rect2);

            if (intersection == null)
                return false;

            if (intersection != null) {
                //sceneBuilder1.levelStatus = Level.NEXTLEVEL;
                _hotDog.numberOfPicklesOnTheHotDog++;
                console.log(_hotDog.numberOfPicklesOnTheHotDog);
                console.log("Getroffen...");
                //this.changeSauceSize();
                return true;
            }

            return false;
        }


        public hndDistance(): number {

            let distance: number = this.mtxWorld.translation.y - this.startingPosition.y;
            console.log(distance);
            return distance;
        }

        /* public hndWallCollision(_bun: HotDog): boolean {
            
            let intersection: f.Rectangle = this.rect.getIntersection(_bun.rect);
            
            if (intersection != null) {
                //sceneBuilder1.levelStatus = Level.NEXTLEVEL;
                console.log("Getroffen...");
                
                //if (this.mtxWorld)
                //this.changeSauceSize();
                return true;
            }
            return false;
                
        } */

        
    }
}