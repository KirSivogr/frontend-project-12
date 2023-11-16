import MessageForm from "./UI/messageForm";
import ChannelList from './UI/channelList'
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import routes from '../utilites/routes'
import {setStateChannels} from "../slices/chanelSlice";
import {PlusSquare} from "react-bootstrap-icons";
import Header from "./UI/Header";

const ChatPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAuth();
    const channels = useSelector((state) => state.channel.channels);

    useEffect(() => {
        const getData = async () => {
            try {
                const headerToken = auth.getAuthHeader();
                const res = await axios.get(routes.dataPath(), {headers: headerToken});
                dispatch(setStateChannels(res.data));

            } catch(err) {
                if (err.response.status === 401 || err.isAxiosError) {
                    const { from } = location.state || { from: { pathname: 'login' } };
                    navigate(from);
                }
                console.log(err);
            }
        }
        getData();
    }, [navigate, dispatch, auth])

    return (
        <>
            <div className="d-flex flex-column h-100">
                <Header />
                <div className="container-fluid h-100 overflow-hidden my-4">
                    <div className="row justify-content-center h-100">
                        <div className="row justify-content-center align-content-center h-100">
                            <div className="row col-xxl-8 h-100 shadow bg-white border border-primary rounded d-flex p-0">
                                <div className="col-3 border-end bg-light p-0 h-100">
                                    <div className="d-flex flex-column h-100">
                                        <div className="p-3 ms-3 d-flex justify-content-between">
                                            <b>{'Каналы'}</b>
                                            <button
                                                type="button"
                                                className="p-0 text-primary border-0 bg-white btn btn-group-vertical"
                                            >
                                                <PlusSquare size={20} />
                                                <span className="visually-hidden">+</span>
                                            </button>
                                        </div>
                                        <hr className="p-0 m-0" />
                                        <ChannelList />
                                    </div>
                                </div>
                                <div className="col p-0 h-100">
                                    <div className="d-flex flex-column h-100">
                                        <div className="bg-light mb-4 p-3 shadow-sm small">
                                            <p className="m-0">
                                                <b>Канал</b>
                                            </p>
                                            <span className="text-muted">
                                                0 сообщений
                                            </span>
                                        </div>
                                        <div className="mt-auto px-5 py-3">
                                            <MessageForm />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ChatPage