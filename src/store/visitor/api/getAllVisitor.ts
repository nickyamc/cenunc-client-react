import {getAllApi} from "../../api";
import {setList} from "../slice";
import {VisitorDto} from "../dto/visitor.dto.ts";
export const getAllVisitor = (relations: RelationObject[] = []) =>
    getAllApi<VisitorDto>({
        entity: 'visitor',
        relations,
        setList
    })