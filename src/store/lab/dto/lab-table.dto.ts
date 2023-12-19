import {LabDto} from "./lab.dto.ts";

export interface LabTableDto extends LabDto {
    key: number | string;
}