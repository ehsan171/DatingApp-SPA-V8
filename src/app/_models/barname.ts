import { Producer } from "./producer";

    export  interface Barname
    {
    id: number;

    title?: string;
    network?: string;
    status?: string;
    statusCodes: number;
    producers?: Producer[];
    producerCodes?: number[];
    baravordNo?: string;
    group?: string[];
    groupID?: number[];
    regDate: Date;
    }
