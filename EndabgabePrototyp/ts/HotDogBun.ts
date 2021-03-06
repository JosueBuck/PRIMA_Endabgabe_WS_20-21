namespace EndabgabePrototyp {
    import f = FudgeCore;
    //import fAid = FudgeAid;

    export enum BUNSTATE {
          WAITING, MOVING  
    }
    
    export class HotDogBun extends GameObject {

        public bunState: BUNSTATE = BUNSTATE.MOVING;

        private speed: number = currentDifficultyValues.hotDogBunSpeed;
        private posOld: f.Vector3;

        public constructor(_name: string, _position: f.Vector3, _size: f.Vector2) {
            super(_name, _position, _size);

            let txtSausage: f.TextureImage = new f.TextureImage("../assets/bun.png");
            let mtrSausage: f.Material = new f.Material("Sausage", f.ShaderTexture, new f.CoatTextured(f.Color.CSS("WHITE"), txtSausage));

            let cmpMaterial: f.ComponentMaterial = new f.ComponentMaterial(mtrSausage);
            cmpMaterial.pivot.scale(f.Vector2.ONE(1));
            this.addComponent(cmpMaterial);
            
        }

        public updateHotDogBun(_walls: f.Node): void {
            this.posOld = this.mtxLocal.translation;
            this.hndWallCollision(_walls);
        }

        

        private hndWallCollision(_walls: f.Node): void { 
            for (let wall of _walls.getChildren()) {
                this.checkWallCollision(<Wall>wall);
            }            
        }

        private checkWallCollision(_wall: Wall): void { 
            let intersection: f.Rectangle = this.rect.getIntersection(_wall.rect);
            if (intersection == null)
                this.move(this.speed);
            else if ( intersection != null) {
                this.mtxLocal.translation = this.posOld;
                this.speed = this.speed * (-1);
                while (this.rect.getIntersection(_wall.rect) != null) {
                    this.mtxLocal.translateX(this.speed * 0.01  * f.Loop.timeFrameGame / 1000);
                    this.rect.position.x += this.speed * 0.01  * f.Loop.timeFrameGame / 1000;
                }
                
            }
            
        }

        private move(_speed: number): void {
            if (this.bunState == BUNSTATE.MOVING) {
                this.constructCollisionRect(new f.Vector2(2, 3), [45, 60, 45, 20]);
                this.mtxLocal.translateX(_speed * f.Loop.timeFrameGame / 1000);
                this.rect.position.x = this.mtxLocal.translation.x - this.rect.size.x / 2;
                this.rect.position.y = this.mtxLocal.translation.y + this.rect.size.y / 2;
            }
            
            
        }

        
    }
}