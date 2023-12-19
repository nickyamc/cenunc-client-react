import {createSlice} from "@reduxjs/toolkit";
import {LabDto} from "../dto/lab.dto.ts";
import {LabTableDto} from "../dto/lab-table.dto.ts";

interface LabState {
    list: LabDto[];
    listTable: LabTableDto[];
    edit: LabDto | null;
    detail: LabDto | null;
}

const initialState: LabState = {
    list: [],
    listTable: [
        {
            key: 1,
            id: 1,
            suneduCode: 'SL01LA55',
            qrCode: `kasjdy-yrtrs-ahfrws`,
            location: `Primer Piso de la Biblioteca - Ciudad Universitaria`,
        },
        {
            key: 2,
            id: 2,
            suneduCode: 'SL01LA56',
            qrCode: `kisjdy-urtes-ahgrws`,
            location: `Segundo Piso de la Biblioteca - Ciudad Universitaria`,
        },
        {
            key: 3,
            id: 3,
            suneduCode: 'SL01LA57',
            qrCode: `wqids-lkass-nuodta`,
            location: `Primer Piso Pabellon A - Ciudad Universitaria`,
        },
    ],
    edit: null,
    detail: null,
};

export const labSlice = createSlice({
    name: 'lab',
    initialState,
    reducers: {
        setList: (state, action) => {
            state.list = action.payload;
            state.listTable = action.payload.map((lab: LabDto) => {
                return {
                    ...lab,
                    key: lab.id.toString(),
                }
            });
        },
        setDetail: (state, action) => {
            state.detail = action.payload
        },
        add: (state, action) => {
            const lab: LabDto = action.payload;
            state.list = [
                ...state.list,
                lab
            ];
            state.listTable = [
                ...state.listTable,
                {
                    ...lab,
                    key: lab.id,
                }
            ];
        },
        update: (state, action) => {
            const index: number = state.list.findIndex((value) => value.id === action.payload.id)
            state.list[index] = {
                ...state.list[index],
                ...action.payload.data
            } as LabDto;
            state.listTable[index] = {
                ...state.listTable[index],
                ...action.payload.data
            } as LabTableDto;
        },
        remove: (state, action) => {
            state.list = state.list.filter((lab: LabDto) => lab.id !== action.payload)
            state.listTable = state.listTable.filter((labTable: LabTableDto) => labTable.id !== action.payload)
        },
        editLab: (state, action) => {
            state.edit = action.payload
        },
    },
});

export const {
    setList,
    setDetail,
    add,
    update,
    remove,
    editLab,
} = labSlice.actions;

export default labSlice.reducer;