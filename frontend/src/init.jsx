import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import App from './components/app/App';
import resources from './locales/index.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './slices/index.js';
import { ApiContext } from './contexts/ApiContext';
import './index.css';
import webSocketApi from './websocket/websocket';

const init = async (socket) => {
  const api = webSocketApi(socket);

  const i18n = i18next.createInstance();
  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ApiContext.Provider value={api}>
          <App />
        </ApiContext.Provider>
      </I18nextProvider>
    </Provider>
  );
};

export default init;
