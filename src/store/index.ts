import { configureStore } from "@reduxjs/toolkit";
import eventReducer from './event/slice';
import labReducer from './lab/slice';
import userReducer from './user/slice';
import visitorReducer from './visitor/slice';
import sessionReducer from './session/slice';
import attendanceReducer from './attendance/slice';

export const store = configureStore({
	reducer: {
		event: eventReducer,
		lab: labReducer,
		user: userReducer,
		visitor: visitorReducer,
		session: sessionReducer,
		attendance: attendanceReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
