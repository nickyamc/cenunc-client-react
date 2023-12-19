import {createApi} from "../../api";
import {add} from "../slice";
import {AttendanceCreateDto} from "../dto/attendance-create.dto.ts";
import {AttendanceDto} from "../dto/attendance.dto.ts";

export const createAttendance = (attendance: AttendanceCreateDto) =>
    createApi<AttendanceDto, AttendanceCreateDto>({
        entity: 'attendance',
        data: attendance,
        add,
    })