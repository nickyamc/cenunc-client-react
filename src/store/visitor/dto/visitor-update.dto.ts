import {VisitorType} from "../../enum/visitorType.ts";
import {AccountUpdateDto} from "../../entity/dto/account-update.dto.ts";

export interface VisitorUpdateDto {
    account?: AccountUpdateDto;
    type?: VisitorType;
    studentCode?: string;
    university?: string;
    career?: string;
    faculty?: string;
    eventIds?: number[];
}