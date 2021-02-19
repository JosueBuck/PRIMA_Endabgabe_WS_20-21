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

        /* public hndShoot(): void {
            console.log("Sausage is moving...");
            console.log(this);
        } */

        public updateHotDogBun(_walls: f.Node): void {
            /* if (this.mtxLocal.translation.x > -10) {
                this.move(-5);
            } else if (this.mtxLocal.translation.x < 10) {
                this.move(5);
            } */
            //this.move(this.speed);
            this.posOld = this.mtxLocal.translation;
            
            //let current
            this.hndWallCollision(_walls);
        }

        

        public hndWallCollision(_walls: f.Node): void { 
            for (let wall of _walls.getChildren()) {
                this.checkWallCollision(<Wall>wall);
            }            
        }

        public checkWallCollision(_wall: Wall): void { 
            let intersection: f.Rectangle = this.rect.getIntersection(_wall.rect);
            //console.log(_wall.rect.position);
            //console.log(this.rect.position);
            if (intersection == null)
                this.move(this.speed);
            else if ( intersection != null) {
                console.log("collision");
                this.mtxLocal.translation = this.posOld;
                /* this.rect.position.y = this.posOld.y;
                this.rect.position.x = this.posOld.x; */
                this.speed = this.speed * (-1);
                while (this.rect.getIntersection(_wall.rect) != null) {
                    this.mtxLocal.translateX(this.speed * 0.01  * f.Loop.timeFrameGame / 1000);
                    this.rect.position.x += this.speed * 0.01  * f.Loop.timeFrameGame / 1000;
                }
                
            }
            
        }

        public move(_speed: number): void {
            if(this.bunState == BUNSTATE.MOVING) {
                this.constructCollisionRect(new f.Vector2(2, 3), [45, 60, 45, 20]);
                this.mtxLocal.translateX(_speed * f.Loop.timeFrameGame / 1000);
                this.rect.position.x = this.mtxLocal.translation.x - this.rect.size.x / 2;
                this.rect.position.y = this.mtxLocal.translation.y + this.rect.size.y / 2;
            }
            
            
        }

        
    }
}