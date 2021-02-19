namespace EndabgabePrototyp {
    import f = FudgeCore;

    
    
    export class Pickle extends GameObject {

        private pickleShootingMovementY: number = 10;
        private startingPosition: f.Vector3;

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
                sceneBuilder1.playAudio("../sounds/pickleLanding.mp3", 1, false);
                _hotDog.numberOfPicklesOnHotDog++;
                return true;
            }

            return false;
        }


        public hndDistance(): number {
            let distance: number = this.mtxWorld.translation.y - this.startingPosition.y;
            return distance;
        }

        
    }
}