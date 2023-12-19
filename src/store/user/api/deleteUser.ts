import {remove} from "../slice";
import {deleteApi} from "../../api";

export const deleteUser = (id: number) =>
    deleteApi({
        entity: 'user',
        id,
        remove,
    })
