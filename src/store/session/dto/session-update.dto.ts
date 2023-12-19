import {SessionEntry} from "../../enum/sessionEntry.ts";

export interface SessionUpdateDto {
    entry?: SessionEntry;
    status?: boolean;
    userId?: number;
}