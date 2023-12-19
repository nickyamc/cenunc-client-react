import {deleteApi} from "../../api";
import {remove} from "../slice";

export const deleteSession = (id: number) =>
    deleteApi({
        entity: 'session',
        id,
        remove
    })