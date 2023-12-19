import {LabDto} from "../../lab/dto/lab.dto.ts";
import {VisitorDto} from "../../visitor/dto/visitor.dto.ts";
import {AttendanceDto} from "../../attendance/dto/attendance.dto.ts";

export interface EventDto {
    id: number;
    title: string;
    description: string;
    location: string;
    labs?: LabDto[];
    visitors?: VisitorDto[];
    attendances?: AttendanceDto[];
}