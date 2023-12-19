import axiosInstance from "../axios/config.ts";
import {AppDispatch} from "../index.ts";

interface CreateProps<CreateDto> {
    entity: string;
    data: CreateDto;
    add: Function;
}

const createApi = <EntityDto, CreateDto>({entity, data, add}: CreateProps<CreateDto>) =>
    async (dispatch: AppDispatch): Promise<boolean> => {
        return await axiosInstance.post(`${entity}`, data)
            .then((response) => response.data)
            .then((data: EntityDto) => {
                dispatch(add(data))
                return true
            })
            .catch(() => false)
    }

export default createApi;