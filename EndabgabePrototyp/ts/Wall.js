"use strict";
var EndabgabePrototyp;
(function (EndabgabePrototyp) {
    var f = FudgeCore;
    class Wall extends EndabgabePrototyp.GameObject {
        constructor(_name, _position, _size) {
            super(_name, _position, _size);
            //let txtWall: f.TextureImage = new f.TextureImage("../assets/bun.png");
            //let mtrWall: f.Material = new f.Material("Sausage", f.ShaderTexture, new f.CoatTextured(null, Wall.mtrSolidWhite));
            let cmpMaterial = new f.ComponentMaterial(Wall.mtrSolidWhite);
            //cmpMaterial.pivot.scale(f.Vector2.ONE(1));
            this.addComponent(cmpMaterial);
        }
    }
    Wall.mtrSolidWhite = new f.Material("Grey", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("GRAY")));
    EndabgabePrototyp.Wall = Wall;
})(EndabgabePrototyp || (EndabgabePrototyp = {}));
//# sourceMappingURL=Wall.js.map