import axiosInstance, {createRelations} from "../axios/config.ts";
import {AppDispatch} from "../index.ts";

interface getAllByPostProps {
    url: string;
    relations?: RelationObject[];
    data: any;
    setList: Function;
    id?: number;
}

const getAllByPostApi = <EntityDto>({url, setList, data, id, relations = []}: getAllByPostProps) =>
    async (dispatch: AppDispatch): Promise<boolean> => {
        return await axiosInstance.post(`${url}${id || ''}${createRelations(relations)}`, data)
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

export default getAllByPostApi;