import {remove} from "../slice";
import {deleteApi} from "../../api";

export const deleteLab = (id: number) =>
    deleteApi({
        entity: 'lab',
        id,
        remove,
    })