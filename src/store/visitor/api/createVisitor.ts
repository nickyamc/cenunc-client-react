import {createApi} from "../../api";
import {add} from "../slice";
import {VisitorCreateDto} from "../dto/visitor-create.dto.ts";
import {VisitorDto} from "../dto/visitor.dto.ts";
export const createVisitor = (visitor: VisitorCreateDto) =>
    createApi<VisitorDto, VisitorCreateDto>({
        entity: 'visitor',
        data: visitor,
        add,
    })