import {EventDto} from "../dto/event.dto.ts";
import {setDetail} from "../slice";
import {getOneApi} from "../../api";

export const getOneEvent = (id: number, relations: RelationObject[] = []) =>
    getOneApi<EventDto>({
        entity: 'event',
        id,
        relations,
        setDetail,
    })