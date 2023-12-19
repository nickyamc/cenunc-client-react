import {deleteApi} from "../../api";
import {remove} from "../slice";

export const deleteVisitor = (id: number) =>
    deleteApi({
        entity: "visitor",
        id,
        remove,
    })