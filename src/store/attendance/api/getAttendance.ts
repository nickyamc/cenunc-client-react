import {getOneApi} from "../../api";
import {setDetail} from "../slice";
export const getAttendance = (id: number, relations: RelationObject[] = []) =>
    getOneApi({
        entity: 'attendance',
        id,
        relations,
        setDetail
    })