import {LabDto} from "../dto/lab.dto.ts";
import {add} from "../slice";
import {LabCreateDto} from "../dto/lab-create.dto.ts";
import {createApi} from "../../api";

export const createLab = (lab: LabCreateDto) =>
    createApi<LabDto, LabCreateDto>({
        entity: 'lab',
        data: lab,
        add,
    })