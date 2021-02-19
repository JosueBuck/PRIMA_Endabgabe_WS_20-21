namespace EndabgabePrototyp {
    import f = FudgeCore;

    
    export class Wall extends GameObject {

        private static readonly mtrSolidWGray: f.Material = new f.Material("Gray", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("GRAY")));


        public constructor(_name: string, _position: f.Vector3, _size: f.Vector2) {
            super(_name, _position, _size);
            let cmpMaterial: f.ComponentMaterial = new f.ComponentMaterial(Wall.mtrSolidWGray);
            this.addComponent(cmpMaterial);
            
        } 
    }
}