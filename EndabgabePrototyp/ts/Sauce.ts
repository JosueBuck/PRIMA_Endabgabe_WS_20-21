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
            /* this.rect.position.y -= this.rect.size.y;
            this.rect.position.x -= this.rect.size.x;
            this.rect.size.x -= this.rect.size.x / 2; */
            //this.rect.position.y = 5;
            
            
        }

        /* public hndShoot(): void {
            console.log("Sausage is moving...");
            console.log(this);
        } */
        public move(): void {
            this.mtxLocal.translateY(this.speed * f.Loop.timeFrameGame / 1000);
            this.constructCollisionRect(new f.Vector2(0, 0), [0, 0, 0, 0]);
            /* this.rect.position.x = this.mtxWorld.translation.x - this.rect.size.x / 2;
            this.rect.position.y = this.mtxWorld.translation.y - this.rect.size.y / 2; */
            
            //console.log(this.rect.position.y);
            
        }

        public hndBunCollision(_bun: HotDog): boolean {
            
             let intersection: f.Rectangle = this.rect2.getIntersection(_bun.rect2);
            
             if (intersection != null) {
                 //sceneBuilder1.levelStatus = Level.NEXTLEVEL;
                 //console.log("Getroffen...");
                 this.changeSauceSize();
                 return true;
             }
             return false;
                
        }

         private changeSauceSize(): void {
             this.cmpTransform.local.scaleY(0.95);
             this.speed -= this.speed * -0.05 ;
             //console.log("scaling y:  " + this.cmpTransform.local.scaling.y);
             //this.cmpTransform.local.scaleY(0.5 * this.speed * f.Loop.timeFrameGame / 1000);
             //console.log(this.speed * f.Loop.timeFrameGame / 1000);
         }

        
    }
}