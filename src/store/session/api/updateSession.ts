import {updateApi} from "../../api";
import {SessionUpdateDto} from "../dto/session-update.dto.ts";
import {update} from "../slice";

export const updateSession = (id: number, sessionUpdateDto: SessionUpdateDto) =>
    updateApi<SessionUpdateDto>({
        entity: 'session',
        id,
        data: sessionUpdateDto,
        update,
    });