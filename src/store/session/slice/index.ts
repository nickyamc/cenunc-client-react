import {createSlice} from "@reduxjs/toolkit";
import {SessionDto} from "../dto/session.dto.ts";
import {SessionTableDto} from "../dto/session-table.dto.ts";

interface SessionState {
    list: SessionDto[];
    listTable: SessionTableDto[];
    edit: SessionDto | null;
    detail: SessionDto | null;
}

const initialState: SessionState = {
    list: [],
    listTable: [],
    edit: null,
    detail: null,
};

export const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        setList: (state, action) => {
            state.list = action.payload;
            state.listTable = action.payload.map((session: SessionDto) => {
                return {
                    ...session,
                    key: session.id,
                }
            });
        },
        setDetail: (state, action) => {
            state.detail = action.payload;
        },
        add: (state, action) => {
            const session: SessionDto = action.payload;
            state.list = [
                ...state.list,
                session
            ];
            state.listTable = [
                ...state.listTable,
                {
                    ...session,
                    key: session.id,
                }
            ];
        },
        update: (state, action) => {
            const index: number = state.list.findIndex((value) => value.id === action.payload.id)
            state.list[index] = {
                ...state.list[index],
                ...action.payload.data
            } as SessionDto;
            state.listTable[index] = {
                ...state.listTable[index],
                ...action.payload.data
            } as SessionTableDto;
        },
        remove: (state, action) => {
            state.list = state.list.filter((session: SessionDto) => session.id !== action.payload);
            state.listTable = state.listTable.filter((sessionTable: SessionTableDto) => sessionTable.id !== action.payload);
        },
        editSession: (state, action) => {
            state.edit = action.payload;
        },
    },
});

export const {
    setList,
    setDetail,
    add,
    update,
    remove,
    editSession,
} = sessionSlice.actions;

export default sessionSlice.reducer;