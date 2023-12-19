import axiosInstance from "../axios/config.ts";
import {AppDispatch} from "../index.ts";

interface UpdateProps<UpdateDto> {
    entity: string;
    id: number;
    data: UpdateDto;
    update: Function;
}

const updateApi = <UpdateDto>({entity, id, data, update}: UpdateProps<UpdateDto>) =>
    async (dispatch: AppDispatch): Promise<boolean> => {
        return await axiosInstance.patch(`${entity}/${id}`, data)
            .then((response) => response.data)
            .then(() => {
                dispatch(update({id, data}))
                return true
            })
            .catch(() => false)
    }

export default updateApi;