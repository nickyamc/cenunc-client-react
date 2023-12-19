import axiosInstance from "../axios/config.ts";
import {AppDispatch} from "../index.ts";

interface DeleteProps {
    entity: string;
    id: number;
    remove: Function;
}

const deleteApi = ({entity, id, remove}: DeleteProps) =>
    async (dispatch: AppDispatch): Promise<boolean> => {
        return await axiosInstance.delete(`${entity}/${id}`)
            .then((_response) => {
                dispatch(remove(id));
                return true;
            })
            .catch(() => {
                return false;
            })
    }

export default deleteApi;