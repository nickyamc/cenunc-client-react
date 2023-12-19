import {AccountDto} from "../../entity/dto/account.dto.ts";
import {VisitorType} from "../../enum/visitorType.ts";
import {DateRecordDto} from "../../entity/dto/dateRecord.dto.ts";
import {AttendanceDto} from "../../attendance/dto/attendance.dto.ts";

export interface VisitorDto {
    id: number;
    account: AccountDto;
    type: VisitorType;
    studentCode: string;
    qrCode: string;
    university: string;
    career: string;
    faculty: string;
    eventIds?: number[];
    events?: Event[];
    attendances?: AttendanceDto[];
    dateRecord?: DateRecordDto;
}