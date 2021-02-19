"use strict";
var EndabgabePrototyp;
(function (EndabgabePrototyp) {
    var f = FudgeCore;
    //import fAid = FudgeAid;
    let BUNSTATE;
    (function (BUNSTATE) {
        BUNSTATE[BUNSTATE["WAITING"] = 0] = "WAITING";
        BUNSTATE[BUNSTATE["MOVING"] = 1] = "MOVING";
    })(BUNSTATE = EndabgabePrototyp.BUNSTATE || (EndabgabePrototyp.BUNSTATE = {}));
    class HotDogBun extends EndabgabePrototyp.GameObject {
        constructor(_name, _position, _size) {
            super(_name, _position, _size);
            this.bunState = BUNSTATE.MOVING;
            this.speed = EndabgabePrototyp.currentDifficultyValues.hotDogBunSpeed;
            let txtSausage = new f.TextureImage("../assets/bun.png");
            let mtrSausage = new f.Material("Sausage", f.ShaderTexture, new f.CoatTextured(f.Color.CSS("WHITE"), txtSausage));
            let cmpMaterial = new f.ComponentMaterial(mtrSausage);
            cmpMaterial.pivot.scale(f.Vector2.ONE(1));
            this.addComponent(cmpMaterial);
        }
        /* public hndShoot(): void {
            console.log("Sausage is moving...");
            console.log(this);
        } */
        updateHotDogBun(_walls) {
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
        hndWallCollision(_walls) {
            for (let wall of _walls.getChildren()) {
                this.checkWallCollision(wall);
            }
        }
        checkWallCollision(_wall) {
            let intersection = this.rect.getIntersection(_wall.rect);
            //console.log(_wall.rect.position);
            //console.log(this.rect.position);
            if (intersection == null)
                this.move(this.speed);
            else if (intersection != null) {
                console.log("collision");
                this.mtxLocal.translation = this.posOld;
                /* this.rect.position.y = this.posOld.y;
                this.rect.position.x = this.posOld.x; */
                this.speed = this.speed * (-1);
                while (this.rect.getIntersection(_wall.rect) != null) {
                    this.mtxLocal.translateX(this.speed * 0.01 * f.Loop.timeFrameGame / 1000);
                    this.rect.position.x += this.speed * 0.01 * f.Loop.timeFrameGame / 1000;
                }
            }
        }
        move(_speed) {
            if (this.bunState == BUNSTATE.MOVING) {
                this.constructCollisionRect(new f.Vector2(2, 3), [45, 60, 45, 20]);
                this.mtxLocal.translateX(_speed * f.Loop.timeFrameGame / 1000);
                this.rect.position.x = this.mtxLocal.translation.x - this.rect.size.x / 2;
                this.rect.position.y = this.mtxLocal.translation.y + this.rect.size.y / 2;
            }
        }
    }
    EndabgabePrototyp.HotDogBun = HotDogBun;
})(EndabgabePrototyp || (EndabgabePrototyp = {}));
//# sourceMappingURL=HotDogBun.js.map