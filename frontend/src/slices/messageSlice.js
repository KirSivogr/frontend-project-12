import { createSlice } from '@reduxjs/toolkit';
import { removeChannel } from './channelSlice';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage(state, { payload }) {
      const { message } = payload;
      state.messages.push(message);
    },
    setStateMessages(state, { payload }) {
      const { messages } = payload;
      state.messages = messages;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeChannel, (state, { payload }) => {
      const { channelId } = payload;
      state.messages = state.messages.filter((message) => message.currentChannelId !== channelId);
    });
  },
});

export const { addMessage, setStateMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
