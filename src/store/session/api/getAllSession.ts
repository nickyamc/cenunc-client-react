import {getAllApi} from "../../api";
import {SessionDto} from "../dto/session.dto.ts";
import {setList} from "../slice";

export const getAllSession = (relations: RelationObject[] = []) =>
    getAllApi<SessionDto>({
        entity: 'session',
        relations,
        setList,
    })