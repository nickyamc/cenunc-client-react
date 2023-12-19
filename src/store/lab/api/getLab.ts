import {setDetail} from "../slice";
import {getOneApi} from "../../api";
import {LabDto} from "../dto/lab.dto.ts";

export const getLab = (id: number, relations: RelationObject[] = []) =>
    getOneApi<LabDto>({
        entity: 'lab',
        id,
        relations,
        setDetail,
    })