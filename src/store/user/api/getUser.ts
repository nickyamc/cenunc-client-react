import {UserDto} from "../dto/user.dto.ts";
import {setDetail} from "../slice";
import {getOneApi} from "../../api";

export const getUser = (id: number, relations: RelationObject[] = []) =>
    getOneApi<UserDto>({
        entity: 'user',
        id,
        relations,
        setDetail,
    })