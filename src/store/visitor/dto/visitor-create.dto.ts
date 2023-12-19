import {VisitorType} from "../../enum/visitorType.ts";
import {AccountCreateDto} from "../../entity/dto/account-create.dto.ts";
export interface VisitorCreateDto {
    account: AccountCreateDto;
    type: VisitorType;
    studentCode: string;
    university: string;
    career: string;
    faculty: string;
    eventIds?: number[];
}