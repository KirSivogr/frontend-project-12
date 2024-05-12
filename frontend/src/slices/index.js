import { configureStore } from '@reduxjs/toolkit';
import channelReducer from './channelSlice';
import messagesReducer from './messageSlice';
import modalReducer from './modalSlice';

export default configureStore({
  reducer: {
    channel: channelReducer,
    messages: messagesReducer,
    modal: modalReducer,
  },
});
