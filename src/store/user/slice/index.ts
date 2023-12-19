import {createSlice} from "@reduxjs/toolkit";
import {UserDto} from "../dto/user.dto.ts";
import {UserTableDto} from "../dto/user-table.dto.ts";
import {UserRole} from "../../enum/userRole.ts";

interface UserState {
    list: UserDto[];
    listTable: UserTableDto[];
    edit: UserDto | null;
    detail: UserDto | null;
}

const initialState: UserState = {
    list: [] as UserDto[],
    listTable: [
        {
            key: 1,
            id: 1,
            role: UserRole.ADMIN,
            account: {
                username: `admin`,
                email: `admin.cucs@gmail.com`,
                firstName: `Admin`,
            },
            isActive: false,
            jobTitle: `-`,
            denomination: `-`,
            birthdate: new Date('2000-01-01'),
        },
        {
            key: 2,
            id: 2,
            role: UserRole.ADMIN,
            account: {
                dni: '76175328',
                username: `jjancco`,
                email: `jjancco@unamad.edu.pe`,
                firstName: `Jhoel Antonio`,
                lastName: 'jancco Yupanqui',
                phone: '51974229465'
            },
            isActive: true,
            jobTitle: `Ingeniero de Sistemas e Informática`,
            denomination: `Coordinador`,
            birthdate: new Date('1997-04-10'),
        },
        {
            key: 3,
            id: 3,
            role: UserRole.EMPLOYEE,
            account: {
                dni: '60640338',
                username: `nmacedoc`,
                email: `nmacedoc@unamad.edu.pe`,
                firstName: `Nick Angel`,
                lastName: 'Macedo Cordova',
                phone: '51968076794'
            },
            isActive: true,
            jobTitle: `Bachiller - Ingeniería de Sistemas e Informática`,
            denomination: `Especialista Informático`,
            birthdate: new Date('2000-10-07'),
        },
        {
            key: 4,
            id: 4,
            role: UserRole.EMPLOYEE,
            account: {
                dni: '72219946',
                username: `vramiresb`,
                email: `vramirezb@unamad.edu.pe`,
                firstName: `Victor Neal`,
                lastName: 'Ramírez Beltrán',
                phone: '51928257649'
            },
            isActive: false,
            jobTitle: `Bachiller - Ingeniería de Sistemas e Informática`,
            denomination: `Especialista Informático`,
            birthdate: new Date('2000-01-01'),
        },
        {
            key: 5,
            id: 5,
            role: UserRole.EMPLOYEE,
            account: {
                dni: '76682826',
                username: `vcasanova0`,
                email: `vcasanovao@unamad.edu.pe`,
                firstName: `Victoria Rebeca`,
                lastName: 'Casanova Olave',
                phone: '51982903557'
            },
            isActive: true,
            jobTitle: `Bachiller - Ingeniería de Sistemas e Informática`,
            denomination: `Especialista Informático`,
            birthdate: new Date('2000-01-01'),
        },
        {
            key: 6,
            id: 6,
            role: UserRole.EMPLOYEE,
            account: {
                dni: '70498895',
                username: `jvasques`,
                email: `jvasques@unamad.edu.pe`,
                firstName: `Johan Jimmy Romario`,
                lastName: 'vasquez Mollesaca',
                phone: '51992960119'
            },
            isActive: false,
            jobTitle: `Bachiller - Ingeniería de Sistemas e Informática`,
            denomination: `Especialista Informático`,
            birthdate: new Date('1995-07-04'),
        },
        {
            key: 7,
            id: 7,
            role: UserRole.EMPLOYEE,
            account: {
                dni: '77493318',
                username: `apenam`,
                email: `apenam@unamad.edu.pe`,
                firstName: `Alberto`,
                lastName: 'Peña Mondragon',
                phone: '51997015769'
            },
            isActive: false,
            jobTitle: `Ingeniero de Sistemas e Informática`,
            denomination: `Especialista Informático`,
            birthdate: new Date('2000-01-01'),
        },
        {
            key: 8,
            id: 8,
            role: UserRole.EMPLOYEE,
            account: {
                dni: '72898069',
                username: `mhurtadol`,
                email: `mhurtadol@unamad.edu.pe`,
                firstName: `Mauricio Raul`,
                lastName: 'Hurtado Ludeña',
                phone: '51965818146'
            },
            isActive: false,
            jobTitle: `Bachiller - Ingeniería Mecatronica`,
            denomination: `Especialista Informático`,
            birthdate: new Date('2000-10-06'),
        },
    ] as UserTableDto[],
    edit: null,
    detail: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setList: (state, action) => {
            state.list = action.payload;
            state.listTable = action.payload.map((user: UserDto) => {
                return {
                    ...user,
                    key: user.id.toString(),
                }
            });
        },
        setDetail: (state, action) => {
            state.detail = action.payload;
        },
        add: (state, action) => {
            const user: UserDto = action.payload;
            state.list = [
                ...state.list,
                user
            ];
            state.listTable = [
                ...state.listTable,
                {
                    ...user,
                    key: user.id,

                }
            ];
        },
        update: (state, action) => {
            const index: number = state.list.findIndex((value) => value.id === action.payload.id)
            state.list[index] = {
                ...state.list[index],
                ...action.payload.data
            } as UserDto;
            state.listTable[index] = {
                ...state.listTable[index],
                ...action.payload.data
            } as UserTableDto;
        },
        remove: (state, action) => {
            state.list = state.list.filter((user: UserDto) => user.id !== action.payload)
            state.listTable = state.listTable.filter((userTable: UserTableDto) => userTable.id !== action.payload)
        },
        editUser: (state, action) => {
            state.edit = action.payload
        },
    },
})

export const {
    setList,
    setDetail,
    add,
    update,
    remove,
    editUser,
} = userSlice.actions;

export default userSlice.reducer