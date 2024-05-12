import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/useAuth';

export default () => {
  const { t } = useTranslation();
  const auth = useAuth();

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light" style={{ background: '#f0f4fd' }}>
      <div className="container">
        <Link to="/" className="navbar-brand">Chat</Link>
        {auth.user ? <button onClick={auth.logOut} type="button" className="btn btn-primary">{t('login.logout')}</button> : null}
      </div>
    </nav>
  );
};
