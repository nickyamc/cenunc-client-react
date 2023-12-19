import {update} from "../slice";
import {EventUpdateDto} from "../dto/event-update.dto.ts";
import {updateApi} from "../../api";

export const updateEvent = (id: number, event: EventUpdateDto) =>
    updateApi<EventUpdateDto>({
        entity: 'event',
        id,
        data: event,
        update,
    })