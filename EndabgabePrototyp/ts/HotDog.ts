namespace EndabgabePrototyp {
    import f = FudgeCore;
    
    
    
    export class HotDog extends GameObject {

        
        public numberOfSauceLoadsOnHotDog: number = 0;
        private speed: number = 30;
        private posOld: f.Vector3;
        private ctrMovement: f.Control = new f.Control("HotDogSpeed", 0.3, f.CONTROL_TYPE.PROPORTIONAL);
        private displayNumberOfSauceLoads: HTMLElement = <HTMLElement>document.getElementById("numberOfItems");
            
        

        public constructor(_name: string, _position: f.Vector3, _size: f.Vector2) {
            super(_name, _position, _size);
            let txtHotDog: f.TextureImage = new f.TextureImage("../assets/HotDog.png");
            let mtrHotDog: f.Material = new f.Material("Sausage", f.ShaderTexture, new f.CoatTextured(f.Color.CSS("WHITE"), txtHotDog));
            let cmpMaterial: f.ComponentMaterial = new f.ComponentMaterial(mtrHotDog);
            cmpMaterial.pivot.scale(f.Vector2.ONE(1));
            this.addComponent(cmpMaterial);
        }


        public updateHotDog(_walls: f.Node): void {
            this.ctrMovement.setDelay(100);
            this.ctrMovement.setInput(
                f.Keyboard.mapToValue(-1, 0, [f.KEYBOARD_CODE.A, f.KEYBOARD_CODE.ARROW_LEFT])
                + f.Keyboard.mapToValue(1, 0, [f.KEYBOARD_CODE.D, f.KEYBOARD_CODE.ARROW_RIGHT])
              );
            this.posOld = this.mtxLocal.translation;
            this.moveHotDog(this.ctrMovement.getOutput(), _walls);
            this.displayNumberOfSauceLoads.innerHTML = "" + this.numberOfSauceLoadsOnHotDog;

            if (this.numberOfSauceLoadsOnHotDog >= currentDifficultyValues.numberOfNeededSauce) {
                
                sceneBuilder1.gameState = GAMESTATE.PAUSE;
                setTimeout(function(): void { sceneBuilder1.gameState = GAMESTATE.PLAY; }, 3000);
                sceneBuilder1.levelStatus = Level.NEXTLEVEL;
            }
                
        }

        

        private moveHotDog(_direction: number, _walls: f.Node): void {
            this.mtxLocal.translateX(_direction * this.speed * f.Loop.timeFrameGame / 1000);
            this.constructCollisionRect(new f.Vector2(0, 0), [0, 0, 0, 0]); 
            //console.log(this);
            this.rect.position.x = this.mtxLocal.translation.x - this.rect.size.x / 2;
            this.rect.position.y = this.mtxLocal.translation.y - this.rect.size.y / 2;
            this.hndWallCollision(_walls);
        }

        private hndWallCollision(_walls: f.Node): void { 
            for (let wall of _walls.getChildren()) {
                this.checkWallCollision(<Wall>wall);
            }            
        }

        private checkWallCollision(_wall: Wall): void { 
            let intersection: f.Rectangle = this.rect.getIntersection(_wall.rect);
            /* console.log(_wall.rect);
            console.log(this.rect); */
            console.log(this.rect.position);
            if (intersection == null)
                return;
            else if ( intersection != null) {
                console.log("collision");
                let difference: number = this.mtxLocal.translation.x - this.posOld.x;
                let direction: number;
                if (difference >= 0) {
                    direction = -1;
                } else 
                    direction = 1;
                this.mtxLocal.translation = this.posOld;
                this.rect.position.x = this.posOld.x - this.rect.size.x / 2;
                this.rect.position.y = this.posOld.y - this.rect.size.y / 2;
                
                while (this.rect.getIntersection(_wall.rect) != null) {
                    this.mtxLocal.translateX(this.speed * direction * 0.01  * f.Loop.timeFrameGame / 1000);
                    //this.rect.position.x += this.speed * direction * 0.01  * f.Loop.timeFrameGame / 1000;
                    this.rect.position.x = this.mtxLocal.translation.x - this.rect.size.x / 2; 
                    this.rect.position.y = this.mtxLocal.translation.y - this.rect.size.y / 2; 
                }
                
            }
            
        }

        

        
  
        
    }
}