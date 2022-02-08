import { Writer } from './writer';

export interface Episode {
    id: number;
    episodeNumber: string;
    episodeTitle: string;
    concept: string;
    writers?: Writer[];
    url?: string;
}
