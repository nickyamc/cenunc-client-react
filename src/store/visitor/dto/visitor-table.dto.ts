import {VisitorDto} from "./visitor.dto.ts";

export interface VisitorTableDto extends VisitorDto {
    key: number | string;
}