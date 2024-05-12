import { useSelector } from 'react-redux';
import LeoProfanity from 'leo-profanity';
import { useAuth } from '../../hooks/useAuth';

const styledYourMessage = { background: '#a6c1f5', maxWidth: '50%' };
const styledAnotherMessage = { background: '#d4e1fa', maxWidth: '50%' };

const MessageWithName = ({ name, currentName, msg }) => (
  <div>
    {name !== currentName
      ? (
        <div>
          <div className="mb-1">
            <b>{name}</b>
          </div>
          <div className="d-inline-flex px-3 py-2 h-auto text-break mb-2 rounded-4" style={styledAnotherMessage}>
            {msg}
          </div>
        </div>
      )
      : (
        <div className="d-flex justify-content-end">
          <div className="d-inline-flex px-3 py-2 h-auto text-break mb-2 rounded-4" style={styledYourMessage}>
            {msg}
          </div>
        </div>
      )}
  </div>
);

const MessageWithoutName = ({ msg, currentName, name }) => (
  <div>
    {name !== currentName
      ? (
        <div className="d-inline-flex px-3 py-2 h-auto text-break mb-2 rounded-4" style={styledAnotherMessage}>
          {msg}
        </div>
      )
      : (
        <div className="d-flex justify-content-end">
          <div className="d-inline-flex px-3 py-2 h-auto text-break mb-2 rounded-4 align-content-end" style={styledYourMessage}>
            {msg}
          </div>
        </div>
      )}
  </div>
);

export default () => {
  const auth = useAuth();
  const filter = LeoProfanity;
  filter.loadDictionary('ru');

  const currentChannelId = useSelector((state) => state.channel.currentChannelId);

  const messagesOfCurrentChannel = useSelector((state) => {
    const { messages } = state.messages;
    return messages
      .filter((message) => Number(message.currentChannelId) === Number(currentChannelId));
  });

  const filteredMessages = messagesOfCurrentChannel.map((message) => ({
    name: message.name,
    msg: filter.clean(message.msg),
    id: message.id,
  }));

  return (
    <>
      {filteredMessages.map(({ name, msg, id }, index, messages) => (
        <div key={id}>
          {/* eslint-disable-next-line no-nested-ternary */}
          {index !== 0 ? messages[index - 1].name === name
            ? <MessageWithoutName name={name} msg={msg} currentName={auth.user} />
            : <MessageWithName name={name} msg={msg} currentName={auth.user} />
            : <MessageWithName name={name} msg={msg} currentName={auth.user} />}
        </div>
      ))}
    </>

  );
};
