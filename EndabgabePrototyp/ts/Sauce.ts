namespace EndabgabePrototyp {
    import f = FudgeCore;

    
    
    export class Sauce extends GameObject {

        

        private speed: number = -5;

        public constructor(_name: string, _position: f.Vector3, _size: f.Vector2) {
            super(_name, _position, _size);

            let txtSauce: f.TextureImage = new f.TextureImage("../assets/sauce.png");
            let mtrSauce: f.Material = new f.Material("Sausage", f.ShaderTexture, new f.CoatTextured(f.Color.CSS("WHITE"), txtSauce));

            let cmpMaterial: f.ComponentMaterial = new f.ComponentMaterial(mtrSauce);
            cmpMaterial.pivot.scale(f.Vector2.ONE(1));
            this.addComponent(cmpMaterial);
        }

        public move(): void {
            this.mtxLocal.translateY(this.speed * f.Loop.timeFrameGame / 1000);
            this.constructCollisionRect(new f.Vector2(0, 0), [0, 0, 0, 0]);
        }

        public hndBunCollision(_bun: HotDog): boolean {
            
             let intersection: f.Rectangle = this.rect2.getIntersection(_bun.rect2);
            
             if (intersection != null) {
                 this.changeSauceSize();
                 return true;
             }
             return false;
                
        }

         private changeSauceSize(): void {
             this.cmpTransform.local.scaleY(0.95);
             this.speed -= this.speed * -0.05 ;
         }

        
    }
}