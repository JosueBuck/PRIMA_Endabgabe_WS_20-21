"use strict";
var EndabgabePrototyp;
(function (EndabgabePrototyp) {
    var f = FudgeCore;
    class Sauce extends EndabgabePrototyp.GameObject {
        constructor(_name, _position, _size) {
            super(_name, _position, _size);
            this.speed = -5;
            let txtSauce = new f.TextureImage("../assets/sauce.png");
            let mtrSauce = new f.Material("Sausage", f.ShaderTexture, new f.CoatTextured(f.Color.CSS("WHITE"), txtSauce));
            let cmpMaterial = new f.ComponentMaterial(mtrSauce);
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
        move() {
            this.mtxLocal.translateY(this.speed * f.Loop.timeFrameGame / 1000);
            this.constructCollisionRect(new f.Vector2(0, 0), [0, 0, 0, 0]);
            /* this.rect.position.x = this.mtxWorld.translation.x - this.rect.size.x / 2;
            this.rect.position.y = this.mtxWorld.translation.y - this.rect.size.y / 2; */
            //console.log(this.rect.position.y);
        }
        hndBunCollision(_bun) {
            let intersection = this.rect2.getIntersection(_bun.rect2);
            if (intersection != null) {
                //sceneBuilder1.levelStatus = Level.NEXTLEVEL;
                //console.log("Getroffen...");
                this.changeSauceSize();
                return true;
            }
            return false;
        }
        changeSauceSize() {
            this.cmpTransform.local.scaleY(0.95);
            //console.log("scaling y:  " + this.cmpTransform.local.scaling.y);
            //this.cmpTransform.local.scaleY(0.5 * this.speed * f.Loop.timeFrameGame / 1000);
            //console.log(this.speed * f.Loop.timeFrameGame / 1000);
        }
    }
    EndabgabePrototyp.Sauce = Sauce;
})(EndabgabePrototyp || (EndabgabePrototyp = {}));
//# sourceMappingURL=Sauce.js.map