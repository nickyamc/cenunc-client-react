import {getOneApi} from "../../api";
import {VisitorDto} from "../dto/visitor.dto.ts";
import {setDetail} from "../slice";
export const getVisitor = (id: number, relations: RelationObject[] = []) =>
    getOneApi<VisitorDto>({
        entity: 'visitor',
        id,
        relations,
        setDetail
    })