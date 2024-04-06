import { combineReducers } from '@reduxjs/toolkit';
import dataSlice from '../features/dataSlice';

const rootReducer = combineReducers({
    data: dataSlice.reducer,
});

export default rootReducer;
