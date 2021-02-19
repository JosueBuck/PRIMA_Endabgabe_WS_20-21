"use strict";
var EndabgabePrototyp;
(function (EndabgabePrototyp) {
    async function hndJson(_url) {
        let response = await fetch(_url);
        let responseJson = await response.json();
        EndabgabePrototyp.difficultyList = await JSON.parse(JSON.stringify(responseJson));
        EndabgabePrototyp.currentDifficultyValues = EndabgabePrototyp.difficultyList[0];
    }
    EndabgabePrototyp.hndJson = hndJson;
})(EndabgabePrototyp || (EndabgabePrototyp = {}));
//# sourceMappingURL=Difficulty.js.map