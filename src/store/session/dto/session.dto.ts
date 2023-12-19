import {DateRecordDto} from "../../entity/dto/dateRecord.dto.ts";
import {UserDto} from "../../user/dto/user.dto.ts";
import {SessionEntry} from "../../enum/sessionEntry.ts";
import {AttendanceDto} from "../../attendance/dto/attendance.dto.ts";

export interface SessionDto {
    id: number;
    entry: SessionEntry;
    status?: boolean;
    userId: number;
    user?: UserDto;
    attendances?: AttendanceDto[];
    dateRecord: DateRecordDto;
}