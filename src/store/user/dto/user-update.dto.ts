import {AccountUpdateDto} from "../../entity/dto/account-update.dto.ts";
import {UserRole} from "../../enum/userRole.ts";

export interface UserUpdateDto {
    account?: AccountUpdateDto;
    role?: UserRole;
    jobTitle?: string;
    denomination?: string;
    birthdate?: Date;
    labId?: number;
}