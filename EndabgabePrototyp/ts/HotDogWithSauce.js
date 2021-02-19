"use strict";
var EndabgabePrototyp;
(function (EndabgabePrototyp) {
    var f = FudgeCore;
    class HotDogWithSauce extends EndabgabePrototyp.GameObject {
        constructor(_name, _position, _size) {
            super(_name, _position, _size);
            this.numberOfPicklesOnTheHotDog = 0;
            let txtHotDog = new f.TextureImage("../assets/HotDogWithSauce.png");
            let mtrHotDog = new f.Material("Sausage", f.ShaderTexture, new f.CoatTextured(f.Color.CSS("WHITE"), txtHotDog));
            let cmpMaterial = new f.ComponentMaterial(mtrHotDog);
            cmpMaterial.pivot.scale(f.Vector2.ONE(1));
            this.addComponent(cmpMaterial);
        }
        updateHotDogWithSauce() {
            this.constructCollisionRect(new f.Vector2(2, 2), [20, 10, 20, 50]);
            if (this.numberOfPicklesOnTheHotDog >= EndabgabePrototyp.currentDifficultyValues.numberOfPicklesNeeded) {
                EndabgabePrototyp.sceneBuilder1.levelStatus = EndabgabePrototyp.Level.NEXTLEVEL;
            }
        }
    }
    EndabgabePrototyp.HotDogWithSauce = HotDogWithSauce;
})(EndabgabePrototyp || (EndabgabePrototyp = {}));
//# sourceMappingURL=HotDogWithSauce.js.map