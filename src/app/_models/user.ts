import { Photo } from './photo';

export interface User {
    id: number;
    username: string;
    created: Date;
    lastActive: Date;
    photoUrl?: string;
    photos?: Photo[];
    orgId?: number;
    firstname?: string;
    lastname?: string;
}
