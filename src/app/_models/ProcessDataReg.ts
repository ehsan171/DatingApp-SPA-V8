import { EpisodeTitle } from './episodeTitle';
import { Producer } from './producer';
import { Writer } from './writer';

export interface ProcessDataReg {
    id: number;
    activity: string;
    type: string;
    userId?: string;
    screenplayId?: string;

}
