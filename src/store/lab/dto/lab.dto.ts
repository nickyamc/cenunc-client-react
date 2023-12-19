import {DateRecordDto} from "../../entity/dto/dateRecord.dto.ts";
import {AttendanceDto} from "../../attendance/dto/attendance.dto.ts";
import {UserDto} from "../../user/dto/user.dto.ts";
import {EventDto} from "../../event/dto/event.dto.ts";

export interface LabDto {
    id: number;
    suneduCode: string;
    location: string;
    qrCode: string;
    userIds?: number[];
    eventIds?: number[];
    users?: UserDto[];
    events?: EventDto[];
    attendances?: AttendanceDto[];
    dateRecord?: DateRecordDto;
}