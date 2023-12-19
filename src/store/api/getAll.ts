import axiosInstance, {createRelations} from "../axios/config.ts";
import {AppDispatch} from "../index.ts";

interface getAllProps {
    entity: string;
    relations?: RelationObject[];
    setList: Function;
}

const getAllApi = <EntityDto>({entity, setList, relations = []}: getAllProps) =>
    async (dispatch: AppDispatch): Promise<boolean> => {
        return await axiosInstance.get(`${entity}${createRelations(relations)}`)
            .then((response) => response.data)
            .then((data: EntityDto[]) => {
                dispatch(setList(data))
                return true
            })
            .catch((error) => {
                if(error.response.status == 401) {
                    localStorage.clear()
                    window.location.reload()
                }
                return false;
            })
    }

export default getAllApi;
