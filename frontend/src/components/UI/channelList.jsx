import {useDispatch, useSelector} from "react-redux";
import {Button, ButtonGroup, Dropdown} from "react-bootstrap";


export default () => {
    const channels = useSelector((state) => state.channel.channels);
    const currentChannelId = useSelector((state) => state.channel.currentChannelId);

    return (
        <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
            {channels.map((channel) => {
                console.log(channel);
                return (
                    <li className={"nav-item w-100"}>
                        {channel.removable === false ? <button type="button" className={channel.id === currentChannelId ? 'btn w-100 text-start rounded-0 btn-secondary' : 'btn w-100 text-start rounded-0'}>
                            <span className="me-1">#</span>{channel.name}
                        </button> : (
                            <Dropdown className="w-100" as={ButtonGroup}>
                                <Button
                                    className={channel.id === currentChannelId ? 'btn w-100 text-start rounded-0 btn-secondary text-truncate' : 'btn w-100 text-start rounded-0 text-truncate'}
                                    key={channel.id}
                                    variant={null}
                                >
                                    {`# ${channel.name}`}
                                </Button>
                                <Dropdown.Toggle split variant={null} className={channel.id === currentChannelId ? 'rounded-0 btn-secondary' : 'rounded-0'}>
                                    <span className="visually-hidden">{"Меню"}</span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item>{"Переименовать"}</Dropdown.Item>
                                    <Dropdown.Item>{"Удалить"}</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        )}
                    </li>
                )
            })}
        </ul>
    )
}