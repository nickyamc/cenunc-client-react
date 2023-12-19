import {EventDto} from "../dto/event.dto.ts";
import {add} from "../slice";
import {EventCreateDto} from "../dto/event-create.dto.ts";
import {createApi} from "../../api";

export const createEvent = (event: EventCreateDto) =>
    createApi<EventDto, EventCreateDto>({
        entity: 'event',
        data: event,
        add,
    })

/*
export const createEvent = (event: EventCreateDto) =>
    async (dispatch: AppDispatch): Promise<boolean> => {
        return await axiosInstance.post(`event`, event)
            .then((response) => response.data)
            .then((data: EventDto) => {
                dispatch(create(data))
                return true
            })
            .catch(() => false)
    }*/
