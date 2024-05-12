import store from '../slices';
import { addMessage } from '../slices/messageSlice';
import { addChannel, removeChannel, renameChannel } from '../slices/channelSlice';

const webSocketApi = (socket) => {
  const withPromise = (operation, ...args) => new Promise((resolve, reject) => {
    socket.emit(operation, ...args, (response) => {
      if (response.status !== 'ok') {
        reject();
      }
      resolve(response.data);
    });
  });

  const api = {
    newMessage: (...args) => withPromise('newMessage', ...args),
    newChannel: (...args) => withPromise('newChannel', ...args),
    removeChannel: (...args) => withPromise('removeChannel', ...args),
    renameChannel: (...args) => withPromise('renameChannel', ...args),
  };

  socket.on('newMessage', (response) => {
    store.dispatch(addMessage({
      message: response,
    }));
  });

  socket.on('newChannel', (response) => {
    store.dispatch(addChannel({
      channel: response,
    }));
  });

  socket.on('removeChannel', (response) => {
    store.dispatch(removeChannel({
      channelId: response.id,
    }));
  });

  socket.on('renameChannel', (response) => {
    store.dispatch(renameChannel({
      channelId: response.id,
      newNameOfChannel: response.name,
    }));
  });

  return api;
};

export default webSocketApi;
