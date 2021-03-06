namespace EndabgabePrototyp {
    import f = FudgeCore;

    
    
    export class Sausage extends GameObject {

        private speed: number = 5;

        public constructor(_name: string, _position: f.Vector3, _size: f.Vector2) {
            super(_name, _position, _size);

            this.rect = new f.Rectangle(_position.x, _position.y, _size.x / 2, _size.y, f.ORIGIN2D.CENTER);
            let txtSausage: f.TextureImage = new f.TextureImage("../assets/sausage.png");
            let mtrSausage: f.Material = new f.Material("Sausage", f.ShaderTexture, new f.CoatTextured(f.Color.CSS("WHITE"), txtSausage));

            let cmpMaterial: f.ComponentMaterial = new f.ComponentMaterial(mtrSausage);
            cmpMaterial.pivot.scale(f.Vector2.ONE(1));
            this.addComponent(cmpMaterial);
        }

        public move(): void {
            this.constructCollisionRect(new f.Vector2(2, 3), [20, 0, 20, 60]);
            this.mtxLocal.translateY(this.speed * f.Loop.timeFrameGame / 1000);
            this.rect.position.x = this.mtxLocal.translation.x - this.rect.size.x / 2;
            this.rect.position.y = this.mtxLocal.translation.y - this.rect.size.y;        
        }

        public hndBunCollision(_bun: HotDogBun): void {
            let intersection: f.Rectangle = this.rect2.getIntersection(_bun.rect2);
            if (intersection != null) {
                hotDogBunOne.bunState = BUNSTATE.WAITING;
            }
                
        }

        
    }
}