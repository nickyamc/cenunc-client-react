import {remove} from "../slice";
import {deleteApi} from "../../api";

export const deleteEvent = (id: number) =>
    deleteApi({
        entity: 'event',
        id,
        remove,
    })