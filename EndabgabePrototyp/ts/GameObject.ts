namespace EndabgabePrototyp {
    import f = FudgeCore;
    
    export class GameObject extends f.Node {

        private static readonly meshQuad: f.MeshQuad = new f.MeshQuad();
        //private static readonly mtrSolidWhite: f.Material = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("WHITE")));

        public rect: f.Rectangle;
        public rect2: f.Rectangle;

        public constructor(_name: string, _position: f.Vector3, _size: f.Vector2) {
            super(_name);

            this.rect = new f.Rectangle(_position.x, _position.y, _size.x, _size.y, f.ORIGIN2D.CENTER);

            

            this.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(_position)));

            let cmpQuad: f.ComponentMesh = new f.ComponentMesh(GameObject.meshQuad);
            this.addComponent(cmpQuad);
            cmpQuad.pivot.scale(_size.toVector3(0));

            //this.constructCollisionRect();

            /* let cMaterial: f.ComponentMaterial = new f.ComponentMaterial(GameObject.mtrSolidWhite);
            this.addComponent(cMaterial); */
        }

        //this.rect = new f.Rectangle(_position.x, _position.y, _size.x, _size.y, f.ORIGIN2D.CENTER);

        public constructCollisionRect(_decreaseRect2: f.Vector2, _changeCalues: number[]): void {
            let cmpQuad: f.ComponentMesh = this.getComponent(f.ComponentMesh);
            //console.log(cmpQuad.pivot.toString());
            let mtxTotal: f.Matrix4x4 = f.Matrix4x4.MULTIPLICATION(this.mtxWorld , cmpQuad.pivot); 
            let point1: f.Vector3 = new f.Vector3(0.5, 0.5, 0);
            let point2: f.Vector3 = new f.Vector3(-0.5, -0.5, 0);

            point1.transform(mtxTotal, true);
            point2.transform(mtxTotal, true);

            let posClient1: f.Vector2 = viewport.pointWorldToClient(point1);
            let posClient2: f.Vector2 = viewport.pointWorldToClient(point2);
            /* posClient1.x -= _decreaseRect2.x * 30; //50
            posClient1.y += _decreaseRect2.y * 50; //120
            posClient2.x += _decreaseRect2.x * 30; //50
            posClient2.y += _decreaseRect2.x * -10; */

            posClient1.x -= _decreaseRect2.x * _changeCalues[0]; //50
            posClient1.y += _decreaseRect2.y * _changeCalues[1]; //120
            posClient2.x += _decreaseRect2.x * _changeCalues[2]; //50
            posClient2.y += _decreaseRect2.x * -_changeCalues[3];
            console.log(_decreaseRect2.y * 40);

            //crc2.strokeRect(posClient1.x, posClient1.y, posClient2.x - posClient1.x, posClient2.y - posClient1.y);
            //console.log(point1.toString(), point2.toString());

            let newRect: f.Rectangle = this.createRectangle(posClient1, posClient2);
            this.rect2 = newRect;
            
            //let posClient: f.Vector2 = viewport.pointWorldToClient(hotDogOne.mtxWorld.translation);
        }

        public createRectangle(_posClient1: f.Vector2, _posClient2: f.Vector2): f.Rectangle {
            let rect: f.Rectangle = new f.Rectangle(_posClient1.x, _posClient1.y, _posClient2.x - _posClient1.x, _posClient2.y - _posClient1.y);
            return rect;
        }

        
    }
}