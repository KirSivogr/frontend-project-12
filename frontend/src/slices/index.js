import { configureStore } from '@reduxjs/toolkit';
import channelReducer from './chanelSlice';

export default configureStore({
    reducer: {
        channel: channelReducer,
    },
});