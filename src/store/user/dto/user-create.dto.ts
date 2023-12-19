import {UserRole} from "../../enum/userRole.ts";
import {AccountCreateDto} from "../../entity/dto/account-create.dto.ts";

export interface UserCreateDto {
    account: AccountCreateDto;
    role: UserRole;
    jobTitle: string;
    denomination: string;
    birthdate?: Date;
    labId: number;
}