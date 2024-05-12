import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PlusSquare } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import MessageForm from '../forms/messageForm';
import ChannelList from '../UI/channelList';
import { useAuth } from '../../hooks/useAuth';
import routes from '../../utilites/routes';
import { setStateChannels } from '../../slices/channelSlice';
import { setStateMessages } from '../../slices/messageSlice';
import Header from '../UI/Header';
import { openWindow } from '../../slices/modalSlice';
import Messages from '../UI/messages';
import MyModal from '../modals/Modal';

const ChatPage = () => {
  const inputRefMsg = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const { t } = useTranslation();

  const currentChannelId = useSelector((state) => state.channel.currentChannelId);
  const channels = useSelector((state) => state.channel.channels);

  const currentChannel = channels.find((channel) => channel.id === currentChannelId);
  const messagesOfCurrentChannel = useSelector((state) => {
    const { messages } = state.messages;
    return messages
      .filter((message) => Number(message.currentChannelId) === Number(currentChannelId));
  });

  const scrollToMyMsgRef = () => {
    inputRefMsg.current.scrollTo(0, inputRefMsg.current.scrollHeight);
  };

  useEffect(() => {
    scrollToMyMsgRef();
  }, [messagesOfCurrentChannel, currentChannelId]);

  useEffect(() => {
    const getData = async () => {
      try {
        const headerToken = auth.getAuthHeader();

        const res = await axios.get(routes.dataPath(), {
          headers: {
            Authorization: `Bearer ${headerToken}`,
          },
        });

        dispatch(setStateChannels(res.data));
        dispatch(setStateMessages(res.data));
      } catch (err) {
        if (err.response.status === 401 || err.isAxiosError) {
          const { from } = location.state || { from: { pathname: 'login' } };
          navigate(from);
        }
      }
    };
    getData();
  }, [navigate, dispatch, auth]);

  return (
    <>
      <MyModal />
      <div className="d-flex flex-column h-100">
        <Header />
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
          <div className="row h-100 bg-white flex-md-row">
            <div className="col-3 border-end bg-light p-0 h-100">
              <div className="d-flex flex-column h-100">
                <div className="p-3 ms-3 d-flex justify-content-between">
                  <b>{t('chatPage.channels')}</b>
                  <button
                    type="button"
                    className="p-0 text-primary border-0 bg-white btn btn-group-vertical"
                    onClick={() => dispatch(openWindow({ typeOfForm: 'addChannelModal' }))}
                  >
                    <PlusSquare size={20} />
                    <span className="visually-hidden">+</span>
                  </button>
                </div>
                <hr className="p-0 m-0" />
                <ChannelList />
              </div>
            </div>
            <div className="col p-0 h-100" style={{ background: '#f0f4fd' }}>
              <div className="d-flex flex-column h-100">
                <div className="bg-light mb-4 p-3 shadow-sm small">
                  <p className="m-0">
                    <b>{currentChannel?.name}</b>
                  </p>
                  <span className="text-muted">
                    {messagesOfCurrentChannel.length}
                    {' '}
                    сообщений
                  </span>
                </div>
                <div id="messages-box" className="chat-messages overflow-auto px-5" ref={inputRefMsg} style={{ scrollbarWidth: 'thin', scrollbarColor: '#a6c1f5 #d4e1fa' }}>
                  <div className="text-break mb-2">
                    <Messages />
                  </div>
                </div>
                <div className="mt-auto px-5 py-3">
                  <MessageForm />
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>

    </>
  );
};

export default ChatPage;
