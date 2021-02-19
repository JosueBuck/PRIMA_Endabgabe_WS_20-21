namespace EndabgabePrototyp {
    import f = FudgeCore;
    
    
    
    export class HotDogWithSauce extends GameObject {

        public numberOfPicklesOnHotDog: number = 0;
        

        public constructor(_name: string, _position: f.Vector3, _size: f.Vector2) {
            super(_name, _position, _size);

            let txtHotDog: f.TextureImage = new f.TextureImage("../assets/HotDogWithSauce.png");
            let mtrHotDog: f.Material = new f.Material("Sausage", f.ShaderTexture, new f.CoatTextured(f.Color.CSS("WHITE"), txtHotDog));

            let cmpMaterial: f.ComponentMaterial = new f.ComponentMaterial(mtrHotDog);
            cmpMaterial.pivot.scale(f.Vector2.ONE(1));
            this.addComponent(cmpMaterial);

            
        }

        public updateHotDogWithSauce(): void {
            this.constructCollisionRect(new f.Vector2(2, 2), [20, 10, 20, 50]);
            if (this.numberOfPicklesOnHotDog >= currentDifficultyValues.numberOfPicklesNeeded) {
                sceneBuilder1.gameState = GAMESTATE.PAUSE;
                setTimeout(function(): void { sceneBuilder1.gameState = GAMESTATE.PLAY; }, 3000);
                sceneBuilder1.levelStatus = Level.NEXTLEVEL;

            }
        }
    
    }

    
        
}