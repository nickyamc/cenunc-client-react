import {update} from "../slice";
import {updateApi} from "../../api";
import {AttendanceUpdateDto} from "../dto/attendance-update.dto.ts";

export const updateAttendance = (id: number, attendance: AttendanceUpdateDto) =>
    updateApi<AttendanceUpdateDto>({
        entity: 'attendance',
        id,
        data: attendance,
        update,
    })