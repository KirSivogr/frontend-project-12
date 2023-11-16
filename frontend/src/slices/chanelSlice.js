import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    channels: [],
    currentChannelId: null
};

const channelSlice = createSlice({
    name: 'channel',
    initialState,
    reducers: {
        setStateChannels: (state, { payload }) => {
            const { channels, currentChanelId } = payload;
            state.channels = channels;
            state.currentChannelId = currentChanelId;
        },
        addChannel: (state, { payload }) => {
            const { channel } = payload;
            state.channels.push(channel);
        },
        removeChannel: (state, { payload }) => {
            const { channelId } = payload;
            state.channels = state.channels.filter((channel) => channel.id !== channelId);
        },
        renameChannel: (state, { payload }) => {
            const {newNameOfChannel, channelId} = payload;
            state.channels.map((channel) => {
                if (channel.id === channelId) {
                    channel.name = newNameOfChannel;
                }
            })
        },
        changeCurrentChannel: (state, { payload }) => {
            const { channelId } = payload;
            state.currentChannelId = channelId;
        }
    },
});


export const { addChannel, removeChannel, changeCurrentChannel, renameChannel, setStateChannels } = channelSlice.actions;

export default channelSlice.reducer;