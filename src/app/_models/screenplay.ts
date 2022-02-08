import { EpisodeTitle } from './episodeTitle';
import { Producer } from './producer';
import { Writer } from './writer';

export interface Screenplay {
    id: number;
    title: string;
    orgStructure?: string;
    status?: string;
    statusCodes: number;
    episodeTitles?: EpisodeTitle[];
    genre?: string;
    genreCodes?: number[];
    producers?: Producer[];
    producerCodes?: number[];
    writers?: Writer[];
    baravordNo?: string;
    totalNumberEpisodes?: number;
    format?: string;
    formatCodes?: number[];
    regDate: Date;

}
