import {SessionDto} from "./session.dto.ts";

export interface SessionTableDto extends SessionDto {
    key: string | number;
}