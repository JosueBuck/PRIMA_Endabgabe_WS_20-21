namespace EndabgabePrototyp {

    export interface DifficultyInformation {
        name: string;
        numberOfSausages: number;
        hotDogBunSpeed: number;
        numberOfSauceLoads: number;
        numberOfNeededSauce: number;
        numberOfPickles: number;
        numberOfPicklesNeeded: number;
    }

    export let difficultyList: DifficultyInformation[];
    


    

    export async function hndJson(_url: RequestInfo): Promise<void> {
        let response: Response = await fetch(_url);
        let responseJson: JSON = await response.json();
        difficultyList = await JSON.parse(JSON.stringify(responseJson));
        currentDifficultyValues = difficultyList[0];
    }


}