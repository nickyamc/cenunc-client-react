import {getOneApi} from "../../api";
import {SessionDto} from "../dto/session.dto.ts";
import {setDetail} from "../slice";

export const getSession = (id: number, relations: RelationObject[] = []) =>
    getOneApi<SessionDto>({
        entity: 'session',
        id,
        relations,
        setDetail,
    })