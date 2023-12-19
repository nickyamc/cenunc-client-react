import {createSlice} from "@reduxjs/toolkit";
import {VisitorDto} from "../dto/visitor.dto.ts";
import {VisitorTableDto} from "../dto/visitor-table.dto.ts";

interface VisitorState {
    list: VisitorDto[];
    listTable: VisitorTableDto[];
    edit: VisitorDto | null;
    detail: VisitorDto | null;
}

const initialState: VisitorState = {
    list: [],
    listTable: [],
    edit: null,
    detail: null,
};

export const visitorSlice = createSlice({
    name: 'visitor',
    initialState,
    reducers: {
        setList: (state, action) => {
            state.list = action.payload
            state.listTable = action.payload.map((visitor: VisitorDto) => {
                return {
                    ...visitor,
                    key: visitor.id,
                }
            })
        },
        setDetail: (state, action) => {
            state.detail = action.payload
        },
        add: (state, action) => {
            const visitor: VisitorDto = action.payload;
            state.list = [
                ...state.list,
                visitor
            ]
            state.listTable = [
                ...state.listTable,
                {
                    ...visitor,
                    key: visitor.id,
                }
            ]
        },
        update: (state, action) => {
            const index: number = state.list.findIndex((value) => value.id === action.payload.id)
            state.list[index] = {
                ...state.list[index],
                ...action.payload.data,
            } as VisitorDto;
            state.listTable[index] = {
                ...state.listTable[index],
                ...action.payload.data,
            } as VisitorTableDto;
        },
        remove: (state, action) => {
            state.list = state.list.filter((value: VisitorDto) => value.id !== action.payload)
            state.listTable = state.listTable.filter((value: VisitorTableDto) => value.id !== action.payload)
        },
        editVisitor: (state, action) => {
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
    editVisitor,
} = visitorSlice.actions;

export default visitorSlice.reducer;