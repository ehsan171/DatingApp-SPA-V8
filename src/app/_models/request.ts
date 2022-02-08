import { Producer } from "./producer";

    export  interface Request
    {
    id: number;
    rRequestTitle: string;
    barnameTitle: string;
    network?: string;
    status?: string;
    statusCodes: number;
    producers?: Producer[];
    producerCodes?: number[];
    baravordNo?: string;
    group?: string[];
    regDate: Date;
    }
