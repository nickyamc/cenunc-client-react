import {DateRecordDto} from "../../entity/dto/dateRecord.dto.ts";
import {LabDto} from "../../lab/dto/lab.dto.ts";
import {VisitorDto} from "../../visitor/dto/visitor.dto.ts";
import {EventDto} from "../../event/dto/event.dto.ts";
import {SessionDto} from "../../session/dto/session.dto.ts";

export interface AttendanceDto {
    id: number;
    checkCode: string;
    labId: number;
    visitorId: number;
    eventId: number;
    sessionId: number;
    lab?: LabDto;
    visitor?: VisitorDto;
    event?: EventDto;
    session?: SessionDto;
    dateRecord: DateRecordDto;
}