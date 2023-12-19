import {UserDto} from "../dto/user.dto.ts";
import {setList} from "../slice";
import {getAllApi} from "../../api";

export const getAllUser = (relations: RelationObject[] = []) =>
    getAllApi<UserDto>({
        entity: 'user',
        relations,
        setList,
    })
