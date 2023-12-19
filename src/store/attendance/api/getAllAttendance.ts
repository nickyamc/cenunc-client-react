import {setList} from "../slice";
import {AttendanceDto} from "../dto/attendance.dto.ts";
import {getAllByPostApi} from "../../api";

export const getAllAttendance = (dates: DatesObject, relations: RelationObject[] = []) =>
    getAllByPostApi<AttendanceDto>({
        url: 'attendance/all',
        data: {...dates},
        relations,
        setList
    });
export const getAllAttendanceByLabId = (id: number, dates: DatesObject, relations: RelationObject[] = []) =>
    getAllByPostApi<AttendanceDto>({
        url: 'attendance/all/lab',
        data: {...dates},
        id,
        relations,
        setList
    });

export const getAllAttendanceByEventId = (id: number, dates: DatesObject, relations: RelationObject[] = []) =>
    getAllByPostApi<AttendanceDto>({
        url: 'attendance/all/event',
        data: {...dates},
        id,
        relations,
        setList
    });

export const getAllAttendanceByVisitorId = (id: number, dates: DatesObject, relations: RelationObject[] = []) =>
    getAllByPostApi({
        url: 'attendance/all/visitor',
        data: {...dates},
        id,
        relations,
        setList
    });

