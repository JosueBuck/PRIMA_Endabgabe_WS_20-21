"use strict";
var EndabgabePrototyp;
(function (EndabgabePrototyp) {
    var f = FudgeCore;
    class HotDog extends EndabgabePrototyp.GameObject {
        constructor(_name, _position, _size) {
            super(_name, _position, _size);
            this.numberOfSauceLoadsOnTheHotDog = 0;
            this.speed = 30;
            this.ctrMovement = new f.Control("HotDogSpeed", 0.3, 0 /* PROPORTIONAL */);
            this.displayNumberOfSauceLoads = document.getElementById("numberOfItems");
            let txtHotDog = new f.TextureImage("../assets/HotDog.png");
            let mtrHotDog = new f.Material("Sausage", f.ShaderTexture, new f.CoatTextured(f.Color.CSS("WHITE"), txtHotDog));
            let cmpMaterial = new f.ComponentMaterial(mtrHotDog);
            cmpMaterial.pivot.scale(f.Vector2.ONE(1));
            this.addComponent(cmpMaterial);
            /* this.mtxLocal.scaleX(3);
            this.rect.size.x = this.mtxLocal.translation.x; */
        }
        /* public hndShoot(): void {
            console.log("Sausage is moving...");
            console.log(this);
        } */
        updateHotDog(_walls) {
            this.ctrMovement.setDelay(100);
            this.ctrMovement.setInput(f.Keyboard.mapToValue(-1, 0, [f.KEYBOARD_CODE.S, f.KEYBOARD_CODE.ARROW_LEFT])
                + f.Keyboard.mapToValue(1, 0, [f.KEYBOARD_CODE.W, f.KEYBOARD_CODE.ARROW_RIGHT]));
            this.posOld = this.mtxLocal.translation;
            this.moveHotDog(this.ctrMovement.getOutput(), _walls);
            this.displayNumberOfSauceLoads.innerHTML = "" + this.numberOfSauceLoadsOnTheHotDog;
            if (this.numberOfSauceLoadsOnTheHotDog >= EndabgabePrototyp.currentDifficultyValues.numberOfNeededSauce) {
                this.displayNumberOfSauceLoads.innerHTML = "";
                EndabgabePrototyp.sceneBuilder1.levelStatus = EndabgabePrototyp.Level.NEXTLEVEL;
            }
        }
        hndWallCollision(_walls) {
            for (let wall of _walls.getChildren()) {
                this.checkWallCollision(wall);
            }
        }
        checkWallCollision(_wall) {
            let intersection = this.rect.getIntersection(_wall.rect);
            /* console.log(_wall.rect);
            console.log(this.rect); */
            console.log(this.rect.position);
            if (intersection == null)
                return;
            else if (intersection != null) {
                console.log("collision");
                let difference = this.mtxLocal.translation.x - this.posOld.x;
                let direction;
                if (difference >= 0) {
                    direction = -1;
                }
                else
                    direction = 1;
                this.mtxLocal.translation = this.posOld;
                this.rect.position.x = this.posOld.x - this.rect.size.x / 2;
                this.rect.position.y = this.posOld.y - this.rect.size.y / 2;
                while (this.rect.getIntersection(_wall.rect) != null) {
                    this.mtxLocal.translateX(this.speed * direction * 0.01 * f.Loop.timeFrameGame / 1000);
                    //this.rect.position.x += this.speed * direction * 0.01  * f.Loop.timeFrameGame / 1000;
                    this.rect.position.x = this.mtxLocal.translation.x - this.rect.size.x / 2;
                    this.rect.position.y = this.mtxLocal.translation.y - this.rect.size.y / 2;
                }
            }
        }
        moveHotDog(_direction, _walls) {
            this.mtxLocal.translateX(_direction * this.speed * f.Loop.timeFrameGame / 1000);
            this.constructCollisionRect(new f.Vector2(0, 0), [0, 0, 0, 0]);
            //console.log(this);
            this.rect.position.x = this.mtxLocal.translation.x - this.rect.size.x / 2;
            this.rect.position.y = this.mtxLocal.translation.y - this.rect.size.y / 2;
            this.hndWallCollision(_walls);
        }
    }
    EndabgabePrototyp.HotDog = HotDog;
})(EndabgabePrototyp || (EndabgabePrototyp = {}));
//# sourceMappingURL=HotDog.js.map