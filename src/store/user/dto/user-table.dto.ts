import {UserDto} from "./user.dto.ts";

export interface UserTableDto extends UserDto {
    key: number | string;
}