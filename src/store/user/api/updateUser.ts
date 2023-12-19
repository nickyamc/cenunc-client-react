import {update} from "../slice";
import {UserUpdateDto} from "../dto/user-update.dto.ts";
import {updateApi} from "../../api";

export const updateUser = (id: number, user: UserUpdateDto) =>
    updateApi<UserUpdateDto>({
        entity: 'user',
        id,
        data: user,
        update,
    })