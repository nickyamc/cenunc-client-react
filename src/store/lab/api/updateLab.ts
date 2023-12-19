import {update} from "../slice";
import {LabUpdateDto} from "../dto/lab-update.dto.ts";
import {updateApi} from "../../api";

export const updateLab = (id: number, event: LabUpdateDto) =>
    updateApi<LabUpdateDto>({
        entity: 'lab',
        id,
        data: event,
        update,
    })