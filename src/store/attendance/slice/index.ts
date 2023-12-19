import {createSlice} from "@reduxjs/toolkit";
import {AttendanceDto} from "../dto/attendance.dto.ts";
import {AttendanceTableDto} from "../dto/attendance-table.dto.ts";

interface AttendanceState {
    list: AttendanceDto[];
    listTable: AttendanceTableDto[];
    edit: AttendanceDto | null;
    detail: AttendanceDto | null;
}

const initialState: AttendanceState = {
    list: [] as AttendanceDto[],
    listTable: [] as AttendanceTableDto[],
    edit: null,
    detail: null,
};

export const attendanceSlice = createSlice({
    name: "attendance",
    initialState,
    reducers: {
        setList: (state, action) => {
            state.list = action.payload;
            state.listTable = action.payload.map((attendance: AttendanceDto) => {
                return {
                    ...attendance,
                    key: attendance.id,
                }
            })
        },
        setDetail: (state, action) => {
            state.detail = action.payload
        },
        add: (state, action) => {
            const attendance: AttendanceDto = action.payload;
            state.list = [
                ...state.list,
                attendance
            ]
            state.listTable = [
                ...state.listTable,
                {
                    ...attendance,
                    key: attendance.id,
                }
            ]
        },
        update: (state, action) => {
            const index: number = state.list.findIndex((value) => value.id === action.payload.id)
            state.list[index] = {
                ...state.list[index],
                ...action.payload.data
            } as AttendanceDto
            state.listTable[index] = {
                ...state.listTable[index],
                ...action.payload.data,
            } as AttendanceTableDto
        },
        remove: (state, action) => {
            state.list = state.list.filter((attendance: AttendanceDto) => attendance.id !== action.payload)
            state.listTable = state.listTable.filter((attendanceTable: AttendanceTableDto) => attendanceTable.id !== action.payload)
        },
        editAttendance: (state, action) => {
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
    editAttendance,
} = attendanceSlice.actions;

export default attendanceSlice.reducer;