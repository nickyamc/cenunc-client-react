import {createApi} from "../../api";
import {SessionDto} from "../dto/session.dto.ts";
import {SessionCreateDto} from "../dto/session-create.dto.ts";
import {add} from "../slice";

export const createSession = (sessionCreateDto: SessionCreateDto) =>
    createApi<SessionDto, SessionCreateDto>({
        entity: 'session',
        data: sessionCreateDto,
        add,
    })