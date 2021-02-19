namespace EndabgabePrototyp {
    import f = FudgeCore;

    
    export class Wall extends GameObject {

        private static readonly mtrSolidWhite: f.Material = new f.Material("Grey", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("GRAY")));


        public constructor(_name: string, _position: f.Vector3, _size: f.Vector2) {
            super(_name, _position, _size);

           

            //let txtWall: f.TextureImage = new f.TextureImage("../assets/bun.png");
            //let mtrWall: f.Material = new f.Material("Sausage", f.ShaderTexture, new f.CoatTextured(null, Wall.mtrSolidWhite));

            let cmpMaterial: f.ComponentMaterial = new f.ComponentMaterial(Wall.mtrSolidWhite);
            //cmpMaterial.pivot.scale(f.Vector2.ONE(1));
            this.addComponent(cmpMaterial);
            
        } 
    }
}