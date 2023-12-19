import {updateApi} from "../../api";
import {update} from "../slice";
import {VisitorUpdateDto} from "../dto/visitor-update.dto.ts";

export const updateVisitor = (id: number, visitor: VisitorUpdateDto) =>
    updateApi<VisitorUpdateDto>({
        entity: 'visitor',
        id,
        data: visitor,
        update,
    })