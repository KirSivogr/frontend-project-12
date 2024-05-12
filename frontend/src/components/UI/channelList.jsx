import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { changeCurrentChannel } from '../../slices/channelSlice';
import { openWindow } from '../../slices/modalSlice';

export default () => {
  const channels = useSelector((state) => state.channel.channels);
  const currentChannelId = useSelector((state) => state.channel.currentChannelId);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <ul
      id="channels-box"
      className="nav flex-column nav-pills nav-fill px-2 py-2 mb-3 overflow-auto h-100 d-block"
    >
      {channels.map((channel) => (
        <li
          key={channel.id}
          className="nav-item w-100"
        >
          {channel.removable === false
            ? (
              <button
                type="button"
                onClick={() => dispatch(changeCurrentChannel({ channelId: channel.id }))}
                className={channel.id === currentChannelId
                  ? 'btn w-100 text-start rounded-start-1 btn-secondary'
                  : 'btn w-100 text-start rounded-start-1'}
              >
                <span className="me-1">#</span>
                {channel.name}
              </button>
            ) : (
              <Dropdown className="w-100" as={ButtonGroup}>
                <Button
                  onClick={() => dispatch(changeCurrentChannel({ channelId: channel.id }))}
                  className={channel.id === currentChannelId
                    ? 'btn w-100 text-start rounded-start-1 btn-secondary text-truncate'
                    : 'btn w-100 text-start rounded-start-1 text-truncate'}
                  key={channel.id}
                  variant={null}
                >
                  {`# ${channel.name}`}
                </Button>
                <Dropdown.Toggle
                  split
                  variant={null}
                  className={channel.id === currentChannelId ? 'rounded-end-1 btn-secondary' : 'rounded-end-1'}
                >
                  <span className="visually-hidden">{t('dropMenu.menu')}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => dispatch(openWindow({ typeOfForm: 'renameChannelModal' }))}>
                    {t('dropMenu.rename')}
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => dispatch(openWindow({ typeOfForm: 'removeChannelModal' }))}>
                    {t('dropMenu.delete')}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
        </li>
      ))}
    </ul>
  );
};
