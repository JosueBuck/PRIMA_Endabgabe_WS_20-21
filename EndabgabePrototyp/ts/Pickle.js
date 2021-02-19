"use strict";
var EndabgabePrototyp;
(function (EndabgabePrototyp) {
    var f = FudgeCore;
    class Pickle extends EndabgabePrototyp.GameObject {
        //private ctrMovement: ƒ.Control = new ƒ.Control("PickleFireMovementY", 0.3, ƒ.CONTROL_TYPE.PROPORTIONAL);
        constructor(_name, _position, _size) {
            super(_name, _position, _size);
            //private gravitiy: number = -5;
            this.pickleShootingMovementY = 10;
            let txtPickle = new f.TextureImage("../assets/pickle.png");
            let mtrPickle = new f.Material("Pickle", f.ShaderTexture, new f.CoatTextured(f.Color.CSS("WHITE"), txtPickle));
            let cmpMaterial = new f.ComponentMaterial(mtrPickle);
            cmpMaterial.pivot.scale(f.Vector2.ONE(1));
            this.addComponent(cmpMaterial);
            this.startingPosition = this.mtxWorld.translation;
        }
        move(_pickleSpeed) {
            this.constructCollisionRect(new f.Vector2(2, 2), [10, 20, 10, 5]);
            this.pickleShootingMovementY += -0.1;
            this.mtxLocal.translateY(this.pickleShootingMovementY * f.Loop.timeFrameGame / 1000);
            this.mtxLocal.translateX((-0.5) * _pickleSpeed * f.Loop.timeFrameGame / 1000);
            this.rect.position.x = this.mtxWorld.translation.x - this.rect.size.x / 2;
            this.rect.position.y = this.mtxWorld.translation.y - this.rect.size.y / 2;
        }
        hndHotDogCollision(_hotDog) {
            let intersection = this.rect2.getIntersection(_hotDog.rect2);
            if (intersection == null)
                return false;
            if (intersection != null) {
                //sceneBuilder1.levelStatus = Level.NEXTLEVEL;
                _hotDog.numberOfPicklesOnTheHotDog++;
                console.log(_hotDog.numberOfPicklesOnTheHotDog);
                console.log("Getroffen...");
                //this.changeSauceSize();
                return true;
            }
            return false;
        }
        hndDistance() {
            let distance = this.mtxWorld.translation.y - this.startingPosition.y;
            console.log(distance);
            return distance;
        }
    }
    EndabgabePrototyp.Pickle = Pickle;
})(EndabgabePrototyp || (EndabgabePrototyp = {}));
//# sourceMappingURL=Pickle.js.map