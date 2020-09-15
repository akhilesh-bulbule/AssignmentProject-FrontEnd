export declare module ItemModule {
    export interface IItemModel{
        ItemId :number;
        ItemName: string;
        Description: string;
        ItemPrice: string;  
    }
}

export class Item{
    ItemId :number;
    ItemName: string;
    Description: string;
    ItemPrice: string;
}