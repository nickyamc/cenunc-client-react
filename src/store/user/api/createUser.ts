import {createApi} from "../../api";
import {add} from "../slice";
import {UserCreateDto} from "../dto/user-create.dto.ts";
import {UserDto} from "../dto/user.dto.ts";
export const createUser = (user: UserCreateDto) =>
    createApi<UserDto, UserCreateDto>({
        entity: 'user',
        data: user,
        add,
    })