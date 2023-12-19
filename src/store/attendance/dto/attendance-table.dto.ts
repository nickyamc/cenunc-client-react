import {AttendanceDto} from "./attendance.dto.ts";

export interface AttendanceTableDto extends AttendanceDto {
    key: number | string;
}