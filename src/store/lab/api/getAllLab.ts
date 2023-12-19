import {setList} from "../slice";
import {getAllApi} from "../../api";

export const getAllLab = (relations: RelationObject[] = []) =>
    getAllApi({
        entity: 'lab',
        relations,
        setList,
    })