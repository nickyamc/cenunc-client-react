import axiosInstance, {createRelations} from "../axios/config.ts";
import {AppDispatch} from "../index.ts";

interface getOneProps {
    entity: string;
    id: number;
    relations?: RelationObject[];
    setDetail: Function;
}

const getOneApi = <EntityDto>({entity, id, relations = [], setDetail}: getOneProps) =>
    async (dispatch: AppDispatch): Promise<boolean> => {
        return await axiosInstance.get(`${entity}/${id}${createRelations(relations)}`)
            .then((response) => response.data)
            .then((data: EntityDto) => {
                dispatch(setDetail(data))
                return true
            })
            .catch(() => false)
    }

export default getOneApi;