import {EventDto} from "./event.dto.ts";

export interface EventTableDto extends EventDto{
    key: number | string
}