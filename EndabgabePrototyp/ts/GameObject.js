"use strict";
var EndabgabePrototyp;
(function (EndabgabePrototyp) {
    var f = FudgeCore;
    class GameObject extends f.Node {
        constructor(_name, _position, _size) {
            super(_name);
            this.rect = new f.Rectangle(_position.x, _position.y, _size.x, _size.y, f.ORIGIN2D.CENTER);
            this.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(_position)));
            let cmpQuad = new f.ComponentMesh(GameObject.meshQuad);
            this.addComponent(cmpQuad);
            cmpQuad.pivot.scale(_size.toVector3(0));
            //this.constructCollisionRect();
            /* let cMaterial: f.ComponentMaterial = new f.ComponentMaterial(GameObject.mtrSolidWhite);
            this.addComponent(cMaterial); */
        }
        //this.rect = new f.Rectangle(_position.x, _position.y, _size.x, _size.y, f.ORIGIN2D.CENTER);
        constructCollisionRect(_decreaseRect2, _changeCalues) {
            let cmpQuad = this.getComponent(f.ComponentMesh);
            //console.log(cmpQuad.pivot.toString());
            let mtxTotal = f.Matrix4x4.MULTIPLICATION(this.mtxWorld, cmpQuad.pivot);
            let point1 = new f.Vector3(0.5, 0.5, 0);
            let point2 = new f.Vector3(-0.5, -0.5, 0);
            point1.transform(mtxTotal, true);
            point2.transform(mtxTotal, true);
            let posClient1 = EndabgabePrototyp.viewport.pointWorldToClient(point1);
            let posClient2 = EndabgabePrototyp.viewport.pointWorldToClient(point2);
            /* posClient1.x -= _decreaseRect2.x * 30; //50
            posClient1.y += _decreaseRect2.y * 50; //120
            posClient2.x += _decreaseRect2.x * 30; //50
            posClient2.y += _decreaseRect2.x * -10; */
            posClient1.x -= _decreaseRect2.x * _changeCalues[0]; //50
            posClient1.y += _decreaseRect2.y * _changeCalues[1]; //120
            posClient2.x += _decreaseRect2.x * _changeCalues[2]; //50
            posClient2.y += _decreaseRect2.x * -_changeCalues[3];
            console.log(_decreaseRect2.y * 40);
            EndabgabePrototyp.crc2.strokeRect(posClient1.x, posClient1.y, posClient2.x - posClient1.x, posClient2.y - posClient1.y);
            //console.log(point1.toString(), point2.toString());
            let newRect = this.createRectangle(posClient1, posClient2);
            this.rect2 = newRect;
            //let posClient: f.Vector2 = viewport.pointWorldToClient(hotDogOne.mtxWorld.translation);
        }
        createRectangle(_posClient1, _posClient2) {
            let rect = new f.Rectangle(_posClient1.x, _posClient1.y, _posClient2.x - _posClient1.x, _posClient2.y - _posClient1.y);
            return rect;
        }
    }
    GameObject.meshQuad = new f.MeshQuad();
    EndabgabePrototyp.GameObject = GameObject;
})(EndabgabePrototyp || (EndabgabePrototyp = {}));
//# sourceMappingURL=GameObject.js.map