import { Producer } from "./producer";

    export interface Allocation
    {
        length: number;
        id: number;
        title: string;
        resourceName: string;
        ResourceCapacity:number,
        year: number;
        month: number;
        day: number;
        hour: number;
        usedUnit: number;
        finalAcceptance:any;
        producers?: Producer[];
        producerCodes?: number[];
        barnameId?: number;
        test: object;
       
    }