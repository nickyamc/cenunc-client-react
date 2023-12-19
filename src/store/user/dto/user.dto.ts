import {AccountDto} from "../../entity/dto/account.dto.ts";
import {DateRecordDto} from "../../entity/dto/dateRecord.dto.ts";
import {SessionDto} from "../../session/dto/session.dto.ts";
import {LabDto} from "../../lab/dto/lab.dto.ts";
import {UserRole} from "../../enum/userRole.ts";

export interface UserDto {
    id: number;
    account: AccountDto;
    role: UserRole;
    jobTitle: string;
    denomination: string;
    birthdate?: Date | null;
    labId?: number;
    isActive: boolean;
    sessions?: SessionDto[];
    lab?: LabDto;
    dateRecord?: DateRecordDto;
}