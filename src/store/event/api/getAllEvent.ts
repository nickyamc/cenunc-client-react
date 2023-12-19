import {setList} from "../slice";
import {getAllApi} from "../../api";

export const getAllEvent = (relations: RelationObject[] = []) =>
    getAllApi({
        entity: 'event',
        relations,
        setList,
    })
