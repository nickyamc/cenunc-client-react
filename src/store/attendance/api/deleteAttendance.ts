import {deleteApi} from "../../api";
import {remove} from "../slice";

export const deleteAttendance = (id: number) =>
    deleteApi({
        entity: 'attendance',
        id,
        remove,
    })