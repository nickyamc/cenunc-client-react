import {SessionEntry} from "../../enum/sessionEntry.ts";

export interface SessionCreateDto {
    id: number;
    entry: SessionEntry;
    userId: number;
}