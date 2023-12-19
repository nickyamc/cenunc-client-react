import {createSlice} from "@reduxjs/toolkit";
import {EventDto} from "../dto/event.dto.ts";
import {EventTableDto} from "../dto/event-table.dto.ts";

interface EventState {
    list: EventDto[];
    listTable: EventTableDto[];
    edit: EventDto | null;
    detail: EventDto | null;
}

const initialState: EventState = {
    list: [],
    listTable: [{
        key: 1,
        id: 1,
        title: `Centros Universitarios de Conectividad`,
        description: `CUCS - Centros Universitarios de Conectividad`,
        location: `Campus Universitario - UNAMAD`,
    }],
    edit: null,
    detail: null,
};

export const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        setList: (state, action) => {
            state.list = action.payload;
            state.listTable = action.payload.map((event: EventDto) => {
                return {
                    ...event,
                    key: event.id,
                }
            })
        },
        setDetail: (state, action) => {
            state.detail = action.payload
        },
        add: (state, action) => {
            const event: EventDto = action.payload;
            state.list = [
                ...state.list,
                event
            ]
            state.listTable = [
                ...state.listTable,
                {
                    ...event,
                    key: event.id,
                }
            ]
        },
        update: (state, action) => {
            const index: number = state.list.findIndex((value) => value.id === action.payload.id)
            state.list[index] = {
                ...state.list[index],
                ...action.payload.data
            } as EventDto
            state.listTable[index] = {
                ...state.listTable[index],
                ...action.payload.data,
            } as EventTableDto
        },
        remove: (state, action) => {
            state.list = state.list.filter((event: EventDto) => event.id !== action.payload)
            state.listTable = state.listTable.filter((eventTable: EventTableDto) => eventTable.id !== action.payload)
        },
        editEvent: (state, action) => {
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
    editEvent,
} = eventSlice.actions;

export default eventSlice.reducer;